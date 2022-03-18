import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  tokenId: {
    type: Number,
    required: true,
    trim: true,
    unique: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  }
}, {
  versionKey: false,
  timestamps: true
})

export default mongoose.model('Token', tokenSchema);