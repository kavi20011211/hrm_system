const express = require("express");
const jwt = require("jsonwebtoken");
const { createClient } = require("@supabase/supabase-js");

const router = express.Router();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware for JWT Authentication
function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access Denied" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid Token" });

    req.user = user;
    next();
  });
}

// Create Post
router.post("/post", authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  const { user_id } = req.user;

  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, content, user_id }]);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Post created successfully", data });
});

// Get All Posts
router.get("/get", authenticateToken, async (req, res) => {
  const { data, error } = await supabase.from("posts").select("*");

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

// Get Single Post
router.get("/get/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

// Update Post
router.put("/update/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { user_id } = req.user;

  const { data, error } = await supabase
    .from("posts")
    .update({ title, content })
    .eq("id", id)
    .eq("user_id", user_id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Post updated successfully", data });
});

// Delete Post
router.delete("/delete/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.user;

  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)
    .eq("user_id", user_id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Post deleted successfully", data });
});

module.exports = router;
