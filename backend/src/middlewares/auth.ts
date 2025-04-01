import jwt from "jsonwebtoken";
const JWT_SECRET: string = process.env.JWT_SECRET || "";

// Middleware for JWT Authentication
export function authenticateToken(req: any, res: any, next: any) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access Denied" });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: "Invalid Token" });

    req.user = user;
    next();
  });
}
