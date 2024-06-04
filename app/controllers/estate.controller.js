import mongoose from 'mongoose'
import db from '../models/index.js'

const Estate = db.estate

export const getAllEstates = (req, res) => {
  return Estate.find()
    .then(estates => {
      if (estates.length === 0) {
        return res
          .status(404)
          .send({ status: 404, message: 'No Estates Found', estates })
      }
      res.status(200).send({
        status: 200,
        message: 'Estates Retrieved Successfully',
        estates
      })
    })
    .catch(error => res.status(500).send({ message: error.message }))
}

export const getEstateById = (req, res) => {
  Estate.findById(req.body.id)
    .then(estate => {
      if (estate == null) {
        return res
          .status(404)
          .send({ status: 404, message: 'No Estate Found', estate })
      }
      res
        .status(200)
        .send({ status: 200, message: 'Estate Retrieved Successfully', estate })
    })
    .catch(error => res.status(500).send({ message: error.message }))
}

export const getEstatebyUserId = (req, res) => {
  return Estate.find({ user_id: req.body.user_id })
    .then(estates => {
      if (estates.length === 0) {
        return res
          .status(404)
          .send({ status: 404, message: 'No Estates Found', estates })
      }
      res.status(200).send({
        status: 200,
        message: 'Estates Retrieved Successfully',
        estates
      })
    })
    .catch(error => res.status(500).send({ message: error.message }))
}

export const createEstate = (req, res) => {
  const user_id = new mongoose.Types.ObjectId(req.body.user_id)
  const estate = new Estate({
    name: req.body.name,
    propertySize: req.body.propertySize,
    price: req.body.price,
    image: req.body.image,
    address: req.body.address,
    type: req.body.type,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    garage: req.body.garage,
    furnished: req.body.furnished,
    swimmingPool: req.body.swimmingPool,
    balcony: req.body.balcony,
    garden: req.body.garden,
    floors: req.body.floors,
    rooms: req.body.rooms,
    phoneNumber: req.body.phoneNumber,
    user_id: user_id
  })
  estate
    .save()
    .then(estate =>
      res
        .status(200)
        .send({ status: 200, message: 'Estate Created Successfully', estate })
    )
    .catch(error => res.status(500).send({ message: error.message }))
}

export const updateEstate = (req, res) => {
  Estate.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    propertySize: req.body.propertySize,
    price: req.body.price,
    image: req.body.image,
    address: req.body.address,
    type: req.body.type,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    garage: req.body.garage,
    furnished: req.body.furnished,
    swimmingPool: req.body.swimmingPool,
    balcony: req.body.balcony,
    garden: req.body.garden,
    floors: req.body.floors,
    rooms: req.body.rooms,
    phoneNumber: req.body.phoneNumber,
  })
    .then(estate => {
      return res.status(200).send({ message: 'Record Updated Successfully', estate })
    })
    .catch(error => res.status(500).send({ message: error.message }))
}

export const deleteEstate = (req, res) => {
  Estate.findByIdAndDelete(req.body.id)
    .then(() =>
      res.status(200).send({ message: 'Record Deleted Successfully' })
    )
    .catch(error => res.status(500).send({ message: error.message }))
}

export default {
  getAllEstates,
  getEstateById,
  createEstate,
  updateEstate,
  deleteEstate,
  getEstatebyUserId
}
