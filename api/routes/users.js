import express from "express";
import { register } from "../controllers/auth.js";
import {
  deleteUser,
  getUser,
  getUsers,
  updatedUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser, verifyVender } from '../utils/verifyToken.js'

const router = express.Router();

//UPDATE
router.put("/:id", verifyUser, updatedUser);

//DELETE
router.delete("/:id",verifyUser, deleteUser);

//GET
router.get("/find/:id", getUser);

//GET ALL
router.get("/", getUsers);

export default router;
