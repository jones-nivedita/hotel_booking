import express from "express";
import { getRooms, getRoomById, updateRoomAvailability } from "../Controllers/RoomController.js";

const router = express.Router();

router.get('/', getRooms);
router.get('/:id', getRoomById);
router.put('/availability/:id', updateRoomAvailability);

export default router;