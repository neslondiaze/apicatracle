import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import morgan from "morgan";
import homeRouter from "./routes/home.route.js";
import userRouter from "./routes/user.route.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", homeRouter);
app.use("/api/v1", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥🔥🔥 http://localhost:${PORT}`));
