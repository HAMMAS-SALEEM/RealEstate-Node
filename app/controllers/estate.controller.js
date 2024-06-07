import mongoose from 'mongoose'
import db from '../models/index.js'
import cloudinary from '../utils/cloudinary.js'

const Estate = db.estate

export const getAllEstates = (req, res) => {
  return Estate.find()
    .then(estates => {
      if (estates.length === 0) {
        return res
          .status(200)
          .send({ status: 200, message: 'No Estates Found', estates })
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

export const createEstate = async (req, res) => {
  const user_id = new mongoose.Types.ObjectId(req.body.user_id)
  const { uploadedIMG } = req.body

  if (uploadedIMG) {
    const uploadRes = await cloudinary.uploader.upload(uploadedIMG, {
      upload_preset: 'realEstate'
    })
    if (uploadRes) {
      const estate = new Estate({
        name: req.body.name,
        propertySize: req.body.propertySize,
        price: req.body.price,
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
        uploadedIMG: uploadRes,
        user_id: user_id
      })
      estate
        .save()
        .then(estate =>
          res.status(200).send({
            status: 200,
            message: 'Estate Created Successfully',
            estate
          })
        )
        .catch(error => res.status(500).send({ message: error.message }))
    }
  }
}

export const updateEstate = async (req, res) => {
  const { uploadedIMG } = req.body
  let uploadRes = req.body.uploadedIMG

  if (uploadedIMG && typeof uploadedIMG === 'string') {
    uploadRes = await cloudinary.uploader.upload(uploadedIMG, {
      upload_preset: 'realEstate'
    })
  }

  if (uploadRes) {
    Estate.findByIdAndUpdate(req.body.id, {
      name: req.body.name,
      propertySize: req.body.propertySize,
      price: req.body.price,
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
      uploadedIMG: uploadRes
    })
      .then(estate => {
        return res
          .status(200)
          .send({ message: 'Record Updated Successfully', estate, uploadRes })
      })
      .catch(error => res.status(500).send({ message: error.message }))
  }
}

export const deleteEstate = (req, res) => {
  Estate.findByIdAndDelete(req.body.id)
    .then(() =>
      res.status(200).send({ message: 'Record Deleted Successfully' })
    )
    .catch(error => res.status(500).send({ message: error.message }))
}

export const searchEstate = async (req, res) => {
  try {
    const pipeline = []

    const searchStage = {
      $search: {
        index: 'estates',
        text: {
          query: req.query.t,
          path: {
            wildcard: '*'
          }
        }
      }
    }
    pipeline.push(searchStage)

    const matchStage = {}
    const filterableFields = ['priceMin', 'priceMax', 'type']

    filterableFields.forEach(field => {
      if (req.query[field]) {
        if (field === 'priceMin') {
          matchStage.price = {
            ...matchStage.price,
            $gte: Number(req.query[field])
          }
        } else if (field === 'priceMax') {
          matchStage.price = {
            ...matchStage.price,
            $lte: Number(req.query[field])
          }
        } else {
          matchStage[field] = req.query[field]
        }
      }
    })

    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage })
    }

    const resp = await Estate.aggregate(pipeline)

    if (resp.length === 0) {
      return res
        .status(201)
        .send({ message: 'No Estate Found!', searched: resp })
    }
    return res
      .status(200)
      .send({ message: 'Estate Retrieved Successfully', searched: resp })
  } catch (error) {
    return res.status(500).send({ message: 'Error retrieving estate' })
  }
}

export default {
  getAllEstates,
  getEstateById,
  createEstate,
  updateEstate,
  deleteEstate,
  getEstatebyUserId,
  searchEstate
}
