import express from "express";
import {
  createdRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updatedRoom,
  updatedRoomAvailabilty,
} from "../controllers/room.js";
// import { createError } from "../utils/error.js";
import { verifyAdmin, verifyVender } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/:hotelId", verifyVender, createdRoom);

//UPDATE
router.put("/:id", verifyVender, updatedRoom);

router.put("/availability/:id", updatedRoomAvailabilty);
            
//DELETE
router.delete("/:id", verifyVender, deleteRoom);

//GET
router.get("/find/:id", getRoom);

//GET ALL
router.get("/", getRooms);

export default router;
