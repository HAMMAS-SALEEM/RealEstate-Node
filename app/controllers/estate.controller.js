import db from "../models/index.js";

const Estate = db.estate;

export const getAllEstates = () => {
  return Estate.find();
}

export const getEstateById = (id) => {
  return Estate.findById(id);
}

export const createEstate = (estate) => {
  const newEstate = new Estate(estate);
  return newEstate.save();
}

export const updateEstate = (id, estate) => {
  return Estate.findByIdAndUpdate(id, estate);
}

export const deleteEstate = (id) => {
  return Estate.findByIdAndDelete(id);
}

export default {
    getAllEstates,
    getEstateById,
    createEstate,
    updateEstate,
    deleteEstate,
}