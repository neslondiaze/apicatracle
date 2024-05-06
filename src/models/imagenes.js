import mongoose from "mongoose";

const imagesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
});

export const Imagen = mongoose.model("Imagen", imagesSchema);
