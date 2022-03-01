import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ValueSchema = new Schema(
  {
    breed: { type: String, required: true, minlength: 5 },
    color: { type: String, required: true },
    height: { type: String, required: true, min: 10, max: 28 },
    year: { type: Number, required: true, min: 2022, max: 1982 },
    price: { type: Number, required: true },

  },
  { timestamps: true, toJSON: { virtuals: true } }
)

// ValueSchema.virtual('creator', {
//   localField: 'creatorId',
//   foreignField: '_id',
//   justOne: true,
//   ref: 'Profile'
// })
