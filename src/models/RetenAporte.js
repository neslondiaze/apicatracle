import mongoose from "mongoose";
const { Shema, model } = "mongoose";

const retenAporteSchema = new Schema(
  {
    cedula: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cedula",
    },
    retenAporte: [{ anio: Number, aporte: Number, retencion: Number }],
  },
  { timestamps: true }
);

export const RetenAport = model("retenAporte", retenAporteSchema);
