import { database } from "../config/db-config";
import { authenticateToken } from "../middlewares/auth";

// Sample Create
export const sampleCreate = [
  authenticateToken,
  async (req: any, res: any) => {
    try {
      const { title, content } = req.body;
      const { user_id } = req.user;

      const response = await database
        .from("sample")
        .insert([{ title, content, user_id }]);

      res.json({ message: response.statusText });
    } catch (error) {
      console.error(error);
    }
  },
];
