import User from "../models/Users.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Vender from "../models/Vender.js";

export const register = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await new User({
      username: username,
      email: email,
      password: hash,
    }).save();
    if (!newUser) return next(createError(400, "something wrong"));
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

//vender/register

export const registerVender = async (req, res, next) => {
  try {
    const { password, email, name, country, city, phone } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newVender = await new Vender({
      name: name,
      email: email,
      country: country,
      city: city,
      phone: phone,
      password: hash,
    }).save();
    if (!newVender) return next(createError(400, "something wrong"));
    res.status(200).send("vender has been created");
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

//LOGIN
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(400, "user not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) return next(createError(400, "Worng password!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
      {
        expiresIn: "1d",
      }
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    if (user.isBlock) {
      res.status(400).json({ message: "user has been blocked" });
    } else {
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })

        .status(200)
        .json({ details: { ...otherDetails }, isAdmin });
    }
  } catch (err) {
    next(err);
  }
};

//vender login//

export const venderLogin = async (req, res, next) => {
  try {
    const vender = await Vender.findOne({ email: req.body.email });
    if (!vender) return next(createError(400, "vender not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      vender.password
    );
    if (!isPasswordCorrect) return next(createError(400, "Worng password!"));

    const token = jwt.sign(
      { id: vender._id, isVender: vender.isVender },
      process.env.JWT,
      {
        expiresIn: "1d",
      }
    );

    const { password, isVender, ...otherDetails } = vender._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isVender });
  } catch (err) {
    next(err);
  }
};
