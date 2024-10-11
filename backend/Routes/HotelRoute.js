import express from "express";
import { getAllHotels, getHotel, getHotelRooms} from "../Controllers/HotelController.js";

const router = express.Router();

router.get("/", getAllHotels);
router.get('/:id', getHotel);
router.get("/room/:id", getHotelRooms);

export default router;