import jwt from "jsonwebtoken";

export const generateTokenAndSetCookies = (res, id) => {
  const token = jwt.sign({ id, role: "admin" }, process.env.JWT_SECRET_KEY, {
    expiresIn: "5d",
  });

  res.cookie("jcookie", token, {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};
