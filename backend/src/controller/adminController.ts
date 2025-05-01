import { database } from "../config/db-config";
import { authenticateToken } from "../middlewares/auth";


// View Admin Profile
export const viewAdminProfile = [
  authenticateToken,
  async (req: any, res: any) => {
    try {
      const userId = req.user.id;

      const { data, error } = await database
        .from("admins")
        .select("id, name, email, role")
        .eq("id", userId)
        .single();

      if (error) return res.status(404).json({ message: "Admin not found" });

      res.json({ message: "Profile fetched successfully", data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

// Edit Admin Profile
export const editAdminProfile = [
  authenticateToken,
  async (req: any, res: any) => {
    try {
      const userId = req.user.id;
      const { name, email } = req.body;

      const { data, error } = await database
        .from("admins")
        .update({ name, email })
        .eq("id", userId);

      if (error) return res.status(400).json({ message: "Update failed" });

      res.json({ message: "Profile updated successfully", data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

// Change Password
export const changePassword = [
  authenticateToken,
  async (req: any, res: any) => {
    try {
      const userId = req.user.id;
      const { currentPassword, newPassword, confirmPassword } = req.body;

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const { data: userData, error: fetchError } = await database
        .from("admins")
        .select("password")
        .eq("id", userId)
        .single();

      if (fetchError || !userData) {
        return res.status(404).json({ message: "Admin not found" });
      }

      if (userData.password !== currentPassword) {
        return res.status(401).json({ message: "Current password incorrect" });
      }

      const { error: updateError } = await database
        .from("admins")
        .update({ password: newPassword })
        .eq("id", userId);

      if (updateError) {
        return res.status(400).json({ message: "Failed to update password" });
      }

      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

// Add Test Data (name)
export const addTestData = [
  authenticateToken,
  async (req: any, res: any) => {
    try {
      const userId = req.user.id;
      const { name } = req.body;

      const { data, error } = await database
        .from("admin_test_data")
        .insert([{ admin_id: userId, name }])
        .single();

      if (error) return res.status(400).json({ message: "Failed to add data" });

      res.json({ message: "Test data added successfully", data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

// Fetch Test Data
export const fetchTestData = [
  authenticateToken,
  async (req: any, res: any) => {
    try {
      const userId = req.user.id;

      const { data, error } = await database
        .from("admin_test_data")
        .select("id, name, created_at, updated_at")
        .eq("admin_id", userId);

      if (error) return res.status(404).json({ message: "No data found" });

      res.json({ message: "Test data fetched successfully", data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

// Update Test Data
export const updateTestData = [
  authenticateToken,
  async (req: any, res: any) => {
    try {
      const userId = req.user.id;
      const { id, name } = req.body;

      const { data, error } = await database
        .from("admin_test_data")
        .update({ name, updated_at: new Date() })
        .eq("id", id)
        .eq("admin_id", userId)
        .single();

      if (error) return res.status(400).json({ message: "Update failed" });

      res.json({ message: "Test data updated successfully", data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
