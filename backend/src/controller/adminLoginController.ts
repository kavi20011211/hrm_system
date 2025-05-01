import { Request, Response } from "express";


export const loginAdmin = (req: Request, res: Response): void => {
  const { email, password } = req.body;

  const validEmail = "kavishkauvindu0@gmail.com";
  const validPassword = "Uvindu@123";

  if (email === validEmail && password === validPassword) {
    const adminProfile = {
      firstName: "Uvindu",
      lastName: "Suraweera",
      email: validEmail,
      password: validPassword,
      confirmPassword: validPassword,
      nic: "200134603218",
      contact: "0742889331",
      image: "", // Optional: can be a default URL or user-uploaded base64 string
    };

    res.status(200).json({ message: "Login successful", profile: adminProfile });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
