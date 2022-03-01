import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const HorseSchema = new Schema(
  {
    breed: { type: String, required: true, minlength: 5 },
    color: { type: String, required: true },
    height: { type: Number, required: true, min: 10, max: 28 },
    year: { type: Number, required: true, min: 1982, max: 2022 },
    price: { type: Number, required: true },
    imgUrl: { type: String, default: 'https://placehold.id/200x200' },
    description: { type: String },
    // creatorId: { type: Schema.Types.ObjectId, ref: 'Account' }

  },
  { timestamps: true, toJSON: { virtuals: true } }
)

// ValueSchema.virtual('creator', {
//   localField: 'creatorId',
//   foreignField: '_id',
//   justOne: true,
//   ref: 'Profile'
// })
