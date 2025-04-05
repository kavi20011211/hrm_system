import { database } from "../config/db-config";
import { authenticateToken } from "../middlewares/auth";

// Job Create
export const jobPostCreate = [
  authenticateToken,
  async (req: any, res: any) => {
    try {
      const { id, title, description } = req.body;
      const response = await database
        .from("jobs")
        .insert([{ title, description, id }]);

      res.json({ message: response.statusText });
    } catch (error) {
      console.error(error);
    }
  },
];

// Job All Read
export const jobPostAllRead = [
  authenticateToken,
  async (req: any, res: any) => {
    try {
      const response = await database.from("jobs").select("*");

      res.json({ message: response.statusText, data: response.data });
    } catch (error) {
      console.error(error);
    }
  },
];

// Job Single Read
export const jobPostSingleRead = [
  authenticateToken,
  async (req: any, res: any) => {
    const { id, title } = req.body;

    try {
      let query = database.from("jobs").select("*");

      if (id) {
        query = query.eq("id", id);
      }

      if (title) {
        query = query.ilike("title", `%${title}%`);
      }

      const response = await query;

      if (response.error) {
        return res.status(400).json({ message: "Bad Request", data: null });
      }

      res.json({ message: "Success", data: response.data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", data: null });
    }
  },
];

// Job Update
export const jobPostUpdate = [
  authenticateToken,
  async (req: any, res: any) => {
    const { id, title, description } = req.body;

    try {
      const response = await database
        .from("jobs")
        .update({ title, description })
        .eq("id", id);

      if (response.error) {
        return res.status(400).json({ message: "Bad Request", data: null });
      }

      res.json({ message: response.statusText });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", data: null });
    }
  },
];

// Job Delete
export const jobPostDelete = [
  authenticateToken,
  async (req: any, res: any) => {
    const { id } = req.body;

    try {
      const response = await database.from("jobs").delete().eq("id", id);

      if (response.error) {
        return res.status(400).json({ message: "Bad Request", data: null });
      }

      res.json({ message: response.statusText });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", data: null });
    }
  },
];
