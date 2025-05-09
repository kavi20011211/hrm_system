import { error } from "console";
import { database } from "../config/db-config";
import { authenticateToken } from "../middlewares/auth";

// Job Create
export const jobPostCreate = [
  authenticateToken,
  async (req: any, res: any) => {
    try {
      const { id, title, description } = req.body;

      if (!id || !title || !description) {
        return res
          .status(400)
          .json({ error: "All required fields must be filled with values" });
      }

      const isJobExist = await database.from("jobs").select("id").eq("id", id);

      if (isJobExist.error) {
        return res.status(500).json({ error: "Database error occurred" });
      }

      if (isJobExist.data && isJobExist.data.length > 0) {
        return res.status(400).json({ error: "Job ID already exists!" });
      }
      const response = await database
        .from("jobs")
        .insert([{ id, title, description }]);

      if (response.error) {
        return res.status(500).json({ error: "Failed to create job post" });
      }

      return res.status(200).json({ message: "Job post created successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error occurred" });
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
