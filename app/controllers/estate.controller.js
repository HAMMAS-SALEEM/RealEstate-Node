import mongoose from 'mongoose'
import db from '../models/index.js'

const Estate = db.estate
const User = db.user

export const getAllEstates = () => {
  return Estate.find()
    .then(estates =>
      res.status(200).send({ message: 'Estate Created Successfully', estates })
    )
    .catch(error => res.status(500).send({ message: error.message }))
}

export const getEstateById = id => {
  return Estate.findById(id)
}

export const createEstate = (req, res) => {
  const user_id = new mongoose.Types.ObjectId(req.body.user_id)
  const findUser = () => {
    return User.findById(req.body.user_id)
  }

  console.log(findUser);
  const estate = new Estate({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    location: req.body.location,
    type: req.body.type,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    user_id: user_id
    // parking: req.body.parking,
    // garage: req.body.garage,
    // furnished: req.body.furnished,
    // elevator: req.body.elevator,
    // swimmingPool: req.body.swimmingPool,
    // balcony: req.body.balcony,
    // garden: req.body.garden,
    // airConditioning: req.body.airConditioning,
    // heating: req.body.heating,
    // internet: req.body.internet,
  })
  estate
    .save()
    .then(estate =>
      res.status(200).send({ message: 'Estate Created Successfully', estate })
    )
    .catch(error => res.status(500).send({ message: error.message }))
}

export const updateEstate = (id, estate) => {
  return Estate.findByIdAndUpdate(id, estate)
}

export const deleteEstate = id => {
  return Estate.findByIdAndDelete(id)
}

export default {
  getAllEstates,
  getEstateById,
  createEstate,
  updateEstate,
  deleteEstate
}
