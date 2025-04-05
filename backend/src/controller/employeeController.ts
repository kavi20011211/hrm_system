import { database } from "../config/db-config";
import { authenticateToken } from "../middlewares/auth";

// Employee Create
export const createEmployee = [
  authenticateToken,
  async (req: any, res: any) => {
    try {
      const { id, name, email, category } = req.body;
      const response = await database
        .from("employees")
        .insert([{ name, email, id, category }]);

      res.json({ message: response.statusText });
    } catch {}
  },
];

// Employee All Read
export const readAllEmployee = [
  authenticateToken,
  async (req: any, res: any) => {
    try {
      const response = await database.from("employees").select("*");

      if (response.error) {
        return res.status(400).json({ message: "Bad Request", data: null });
      }

      res.json({ message: response.statusText, data: response.data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", data: null });
    }
  },
];

// Employee Single Read
export const readSingleEmployee = [
  authenticateToken,
  async (req: any, res: any) => {
    try {
      const { id, name } = req.body;
      const response = await database
        .from("employees")
        .select("*")
        .eq("id", id)
        .ilike("name", `%${name}%`);

      if (response.error) {
        return res.status(400).json({ message: "Bad Request", data: null });
      }

      res.json({ message: response.statusText, data: response.data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", data: null });
    }
  },
];
