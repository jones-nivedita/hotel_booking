import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSMongoose from '@adminjs/mongoose'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import uploadFeature from '@adminjs/upload';
import { ComponentLoader } from "adminjs";
import { fileURLToPath } from 'url';
import hotelsRoute from './Routes/HotelRoute.js';
import usersRoute from './Routes/UserRoute.js';
import roomsRoute from './Routes/RoomRoute.js'
import Hotel from './Models/Hotel.js'
import Room from './Models/Room.js'

const PORT = 8001;
dotenv.config();
AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})


const __dirname = fileURLToPath(new URL(".", import.meta.url));

const start = async () => {

  const app = express();
  app.use(express.json());
  app.use(cors({credentials:true, origin:'http://localhost:3000'}));
  app.use(cookieParser());
  app.use('/uploads', express.static(__dirname + '/uploads'));
 
  const localProvider = {
    bucket: "./uploads",
    baseUrl: "/uploads",
    };
    const componentLoader = new ComponentLoader()

  try{
    const mongooseDb = await mongoose.connect(process.env.MONGODB)
    if(mongooseDb!=null){
       console.log('Connected to MongoDB');
       }

  const admin = new AdminJS({
    componentLoader,
    resources: [
        {
          resource: Hotel,
          options: {
            properties: {
              photos: {
                type: 'mixed', // Use 'mixed' for array of strings
                isVisible: { list: true, show: true, edit: true, filter: true },
              },
            },
          },
          features: [
            uploadFeature({
              componentLoader,
              provider: { local: localProvider }, // Use local provider for development
              multiple: true,
              properties: {
                key: 'photos', 
                mimeType: 'mimeType', 
                bucket: 'bucket',
                size: 'size',
              },
              validation: {
                mimeTypes: ['image/jpeg', 'image/png', 'image/jpg'], 
              },
              uploadPath: (record, filename) => {
                return `hotels/${filename}`; 
              },
            }),
          ],
        },

        {
          resource: Room,
          options: {
            properties: {
              hotelId: {
                reference: 'Hotel',
                isVisible: {list: true, filter: true, show: true, edit: true,
                },
              },
            },
            actions: {
              new: {
                after: async (response, request, context) => {
                  if (response.record && response.record.id) {
                    const roomId = response.record.id;
                    const hotelId = request.payload.hotelId;
  
                    try {
                      await Hotel.findByIdAndUpdate(hotelId, {
                        $push: { rooms: roomId },
                      });
                    } catch (err) {
                      console.error('Error updating hotel with room ID:', err);
                    }
                  }
                  return response;
                },
              },
              delete: {
                after: async (response, request, context) => {
                  const roomId = context.record.id();
                  try {
                    await Hotel.updateMany(
                      { rooms: roomId },
                      { $pull: { rooms: roomId } }
                    );
                  } catch (err) {
                    console.error('Error removing room ID from hotel:', err);
                  }
                  return response;
                },
              },
            },
          },
        },
    ],
    rootPath: "/admin",
  });
 
  const adminRouter = AdminJSExpress.buildRouter(admin)
  app.use(admin.options.rootPath, adminRouter)

  app.use('/api/hotels', hotelsRoute);
  app.use('/api/users', usersRoute);
  app.use('/api/rooms', roomsRoute);

  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
  admin.watch();
}catch (error) {
  console.error('Error starting AdminJS:', error);
 }
}

start()