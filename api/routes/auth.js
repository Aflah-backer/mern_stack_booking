import express from "express";
import { login, register, registerVender, venderLogin } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/register/vender", registerVender);

router.post("/vender/login", venderLogin);

export default router;
