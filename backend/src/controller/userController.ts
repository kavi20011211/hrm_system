import { database } from "../config/db-config";
import { loginRequest, signUpRequest } from "../types";
import jwt from "jsonwebtoken";
const bcrypt = require("bcrypt");

const JWT_SECRET: string = process.env.JWT_SECRET || "";

// Signup
export const signUp = async (req: any, res: any) => {
  const { email, password, name }: signUpRequest = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const response = await database
    .from("users")
    .insert([{ email, password: hashedPassword, name }]);

  console.log(response);

  const token: string = jwt.sign({ name, email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ message: response.statusText, token });
};

// Login
export const login = async (req: any, res: any) => {
  const { email, password }: loginRequest = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const { data, error, statusText } = await database
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data) {
    return res.status(401).json({ error: "Can't find account for this email" });
  }

  const bcrypt = require("bcrypt");
  const isPasswordValid = await bcrypt.compare(password, data.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Incorrect password" });
  }

  const token: string = jwt.sign({ user_id: data.id, email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ message: statusText, token });
};
