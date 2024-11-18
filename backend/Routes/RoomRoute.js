import express from "express";
import { updateRoomAvailability } from "../Controllers/RoomController.js";

const router = express.Router();

router.put('/availability/:id', updateRoomAvailability);

export default router;