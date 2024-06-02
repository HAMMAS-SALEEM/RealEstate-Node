import mongoose from 'mongoose'

const Estate = new mongoose.model(
  'Estate',
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    propertySize: {
      type: String,
      required: true
    },
    address: {
      street: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      }
    },
    image: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    bedrooms: {
      type: Number,
      required: true
    },
    bathrooms: {
      type: Number,
      required: true
    },
    garage: {
      type: Boolean,
      required: true,
      default: false
    },
    furnished: {
      type: Boolean,
      required: true,
      default: false
    },
    swimmingPool: {
      type: Boolean,
      required: true,
      default: false
    },
    balcony: {
      type: Boolean,
      required: true,
      default: false
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  })
)

export default Estate
