import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/staticdata.js"; // Make sure you have this in your staticdata

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the authorization header starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided!" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token

  // Verify the token using jwt.verify
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token!" });
    }

    // Attach the decoded token to the request object for future use
    req.user = decoded;
    next(); // Continue to the next middleware or route handler
  });
};
