import mongoose from 'mongoose'
import db from '../models/index.js'

const Estate = db.estate
const User = db.user

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
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    location: req.body.location,
    type: req.body.type,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    user_id: user_id
    //     parking: req.body.parking,
    //     garage: req.body.garage,
    //     furnished: req.body.furnished,
    //     elevator: req.body.elevator,
    //     swimmingPool: req.body.swimmingPool,
    //     balcony: req.body.balcony,
    //     garden: req.body.garden,
    //     airConditioning: req.body.airConditioning,
    //     heating: req.body.heating,
    //     internet: req.body.internet,
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
    console.log(req.body.id)
  Estate.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    location: req.body.location,
    type: req.body.type,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms
  })
  .then((data) => {
    console.log(data);
    return res.status(200).send({message: "Record Updated Successfully"})
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
