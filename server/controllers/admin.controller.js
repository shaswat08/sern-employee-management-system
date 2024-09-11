import { connectToDB } from "../config/db.js";
import { generateTokenAndSetCookies } from "../utils/jwt.js";
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const conn = await connectToDB();

    const sql = "SELECT * FROM admin WHERE email = ?";
    const [rows] = await conn.query(sql, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "No user can be found" });
    }
    const user = rows[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    generateTokenAndSetCookies(res, user.id);

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error in the adminLogin controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
