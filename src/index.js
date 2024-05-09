import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
//import fileupload from "express-fileupload";
import cors from "cors";
import morgan from "morgan";
import homeRouter from "./routes/home.route.js";
import authRouter from "./routes/auth.route.js";
import linkRouter from "./routes/link.route.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
/* app.use(
  fileupload({
    limitl: { fileSize: 50 * 1024 * 1024 },
  })
); */
app.use(morgan("dev"));

app.use("/api/v1", homeRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);

app.use((req, res) => {
  res.status(404).json({ status: false, errors: "Not founr" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥🔥🔥 http://localhost:${PORT}`));
