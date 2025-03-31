require("dotenv").config();
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

export const app = express();
app.use(express.json());
app.use(cors());

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

console.log(supabase);
const JWT_SECRET = process.env.JWT_SECRET;

// // Signup Route
// app.post("/signup", async (req, res) => {
//   const { email, password } = req.body;
//   const { data, error } = await supabase.auth.signUp({ email, password });

//   if (error) return res.status(400).json({ error: error.message });

//   const token = jwt.sign({ user_id: data.user.id, email }, JWT_SECRET, {
//     expiresIn: "1h",
//   });
//   res.json({ token });
// });

// // Login Route
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) return res.status(401).json({ error: error.message });

//   const token = jwt.sign({ user_id: data.user.id, email }, JWT_SECRET, {
//     expiresIn: "1h",
//   });
//   res.json({ token });
// });

// // Protected Route
// app.get("/protected", authenticateToken, (req, res) => {
//   res.json({ message: "You have accessed a protected route!", user: req.user });
// });

// // Middleware for JWT Authentication
// export function authenticateToken(req, res, next) {
//   const token = req.header("Authorization")?.split(" ")[1];

//   if (!token) return res.status(401).json({ error: "Access Denied" });

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ error: "Invalid Token" });

//     req.user = user;
//     next();
//   });
// }

// app.listen(5000, () => console.log("Server running on port 5000"));
