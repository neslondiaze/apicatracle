import mongoose from "mongoose";

// connection to db
try {
  await mongoose.connect(process.env.URI_MONGO);
  console.log("😎😎 Connect DB ok 👌");
} catch (err) {
  console.log("🙁🙁 Error de conexión a mongodb: 🔥" + err);
}
