import mongoose from "mongoose";
const { Schema, model } = "mongoose";

const retenAporteSchema = new Schema(
  {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requerid: true,
    },
    retenAporte: [
      { anio: Number, mes: Nuber, aporte: Number, retencion: Number },
    ],
  },
  { timestamps: true }
);

export const RetenAport = model("retenAporte", retenAporteSchema);
