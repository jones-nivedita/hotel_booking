import Hotel from "../Models/Hotel.js";
import Room from "../Models/Room.js";

export const getAllHotels = (req, res) => {
  const { min, max, ...others } = req.query;
  Hotel.find({
    ...others,
    cheapestPrice: { $gt: min || 1, $lt: max || 50000 },
  })
    .then((hotels) => {
      res.status(200).json(hotels);
    })
    .catch(err => res.status(500).json({ error: err.message }));
};


export const getHotel = (req, res) => {
    Hotel.findById(req.params.id)
      .then(hotel => res.json(hotel))
      .catch(err => res.status(500).json({ error: err.message }));
}
  

export const getHotelRooms = (req, res) => {
    Hotel.findById(req.params.id)
      .then((hotel) => {
        if (!hotel) {
          throw new Error("Hotel not found");
        }
        return Promise.all(hotel.rooms.map((room) => Room.findById(room)));
      })
      .then((list) => {
        res.status(200).json(list);
      })
      .catch(err => res.status(500).json({ error: err.message }));
};

