import Room from '../Models/Room.js';


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