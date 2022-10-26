import Vender from "../models/Vender.js";

//update
export const updatedVender = async (req, res, next) => {
  try {
    const updatedVender = await Vender.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedVender);
  } catch (err) {
    next(err);
  }
};

//delete
export const deleteVender = async (req, res, next) => {
  try {
    await Vender.findByIdAndDelete(req.params.id);
    res.status(200).json("Vender has been deleted");
  } catch (err) {
    next(err);
  }
};
//get a vender
export const getVender = async (req, res, next) => {
  try {
    const vender = await Vender.findById(req.params.id);
    res.status(200).json(vender);
  } catch (err) {
    next(err);
  }
};

// get all venders
export const getVenders = async (req, res, next) => {
  try {
    const vender = await Vender.find();
    res.status(200).json(vender);
  } catch (err) {
    next(err);
  }
};

// block update
export const updateVender = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const updatedVender = await Vender.findByIdAndUpdate(
      req.params.id,
      { $set:{isAproved: true}  },
      { new: true }
    );
    res.status(200).json(updatedVender);
  } catch (err) {
    next(err);
  }
};
