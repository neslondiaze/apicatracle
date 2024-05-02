import mongoose from "mongoose";
const { Shema, model } = "mongoose";

const socioSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cedula: {
      type: Number,
      required: true,
      unique: true,
    },
    cuenta: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Socio = model("socio", socioSchema);
