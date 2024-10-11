import Room from '../Models/Room.js';

export const getRooms = (req, res) => {
    Room.find()
      .then(rooms => res.json(rooms))
      .catch(error => {
        res.status(500).json({ error: 'Internal Server Error' })
      });
}

export const getRoomById = (req, res) => {
    Room.find(req.params.id)
      .then(room => res.json(room))
      .catch(error => {
        res.status(500).json({ error: 'Internal Server Error' })
      });     
}

export const updateRoomAvailability = (req, res) => {
    Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      )
      .then(result => res.status(200).json("Room status has been updated."))
      .catch(error => {
        res.status(500).json({ error: 'Internal Server Error' })
      });
  };