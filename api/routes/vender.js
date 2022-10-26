import express from "express";
import {
  deleteVender,
  getVender,
  getVenders,
  updatedVender,
  updateVender,
} from "../controllers/vender.js";

import {
  verifyAdmin,
  //   verifyToken,
  //   verifyUser,
  verifyVender,
} from "../utils/verifyToken.js";

const router = express.Router();

router.put("/block/:id", verifyAdmin, updateVender)
// update
router.put("/:id", verifyVender, updatedVender);

// delete
router.delete("/:id", verifyVender, deleteVender);

//GET A VENDER
router.get("/find/:id", verifyAdmin, getVender);

//get all venders
router.get("/", getVenders);


export default router;
