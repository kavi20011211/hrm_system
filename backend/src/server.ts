require("dotenv").config();
import express from "express";
import cors from "cors";
import { authenticateToken } from "./middlewares/auth";
import userRoutes from "./routes/userRoutes";
import sampleRoutes from "./routes/sampleRoutes";
export const app = express();
app.use(express.json());
app.use(cors());

//Default Routes
app.use("/api", userRoutes, sampleRoutes);

// To tesing JWT authentication
app.get("/protected", authenticateToken, (req: any, res: any) => {
  res.json({ message: "You have accessed a protected route!", user: req.user });
});

app.listen(5000, () => console.log("Server running on port 5000"));
