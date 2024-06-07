import mongoose from 'mongoose'

const Estate = new mongoose.model(
  'Estate',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      enum: {
        values: [
          'House',
          'House Upper Portion',
          'House Lower Portion',
          'Villa',
          'Flat',
          'Plot',
          'Building',
          'Office Floor'
        ],
        message: 'Invalid Property Type'
      }
    },
    price: {
      type: Number,
      required: true,
      min: [1000, "Value must be greater than 999"]
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
      required: true,
      enum: {
        values: [
          'For Rent',
          'For Sale'
        ],
        message: 'Invalid Type - {VALUE}'
      }
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
    floors: {
      type: Number,
      required: true
    },
    rooms: {
      type: Number,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    uploadedIMG: {
      type: Object,
      required: true
    },
  }, {
    timestamps: true
  })
)

export default Estate
