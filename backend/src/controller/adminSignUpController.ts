import { database } from "../config/db-config";
import { authenticateToken } from "../middlewares/auth";

export const adminSignUp = [
  authenticateToken,
  async (req: any, res: any) => {
    try {
      const {
        firstName,
        lastName,
        email,
        contact,
        nic,
        password,
        confirm_password,
      } = req.body;
      if (
        !firstName ||
        !lastName ||
        !email ||
        !contact ||
        !nic ||
        !password ||
        confirm_password
      ) {
        return res
          .status(400)
          .json({ error: "All required fields must  be filled with values" });
      }

      if (password !== confirm_password) {
        return res.status(400).json({ error: "Passwords should be matched" });
      }

      const response = await database.from("admins").insert([
        {
          firstName,
          lastName,
          email,
          contact,
          nic,
          password,
          confirm_password,
        },
      ]);

      res.json({ message: response.statusText });
    } catch (error: any) {
      console.error(error);
    }
  },
];
