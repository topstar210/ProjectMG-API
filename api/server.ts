import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/user";
import adminRoutes from "./routes/admin";
import customerRoutes from "./routes/customer";
import moderatorRoutes from "./routes/moderator";
import imageRoutes from "./routes/image";
import skillRoutes from "./routes/skill";
import categoryRoutes from "./routes/category";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/moderator", moderatorRoutes);
app.use("/api/skill", skillRoutes);
app.use("/api/category", categoryRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!!!, Server is running");
});

// Serve the 'uploads' folder to access uploaded images
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Failed to connect to MongoDB", err));

export default app;
