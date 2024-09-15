import { error } from "console";
import { connectToDB } from "../config/db.js";
import { generateTokenAndSetCookies } from "../utils/jwt.js";
import fs from "fs/promises";

export const adminLogin = async (req, res) => {
  let conn = null;
  try {
    const { email, password } = req.body;

    conn = await connectToDB();

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
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  } finally {
    if (conn) conn.end();
  }
};

export const addCategory = async (req, res) => {
  let conn = null;
  try {
    const { category } = req.body;

    conn = await connectToDB();

    const sql = "INSERT INTO categories (name) VALUES (?)";

    await conn.query(sql, [category]);

    res.status(200).json({ message: "Category added successfully" });
  } catch (error) {
    console.error("Error in the addCategory controller: ", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  } finally {
    if (conn) conn.end();
  }
};

export const getCategoryList = async (req, res) => {
  let conn = null;
  try {
    conn = await connectToDB();

    const sql = "SELECT * FROM categories";

    const [rows] = await conn.query(sql);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error in the addCategory controller: ", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  } finally {
    if (conn) conn.end();
  }
};

export const deleteCategory = async (req, res) => {
  let conn = null;
  try {
    const { id } = req.params;

    conn = await connectToDB();
    const checkSql = "SELECT * FROM categories WHERE id = ?";
    const [category] = await conn.query(checkSql, [id]);

    if (category.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    const deleteSql = "DELETE FROM categories WHERE id = ?";

    await conn.query(deleteSql, [id]);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error in the deleteCategory controller: ", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  } finally {
    if (conn) conn.end();
  }
};

export const addEmployees = async (req, res) => {
  let conn = null;
  try {
    const { name, email, salary, address, category_id } = req.body;
    const file = req.file;

    conn = await connectToDB();

    const sql =
      "INSERT INTO employees (name, email, address, salary, image, category_id) VALUES(?, ?, ?, ?, ?, ?)";

    await conn.query(sql, [
      name,
      email,
      address,
      salary,
      file.filename,
      category_id,
    ]);

    res.status(200).json({ message: "Employee added successfully" });
  } catch (error) {
    console.error("Error in the addEmployees controller: ", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  } finally {
    if (conn) conn.end();
  }
};

export const getAllEmployees = async (req, res) => {
  let conn = null;
  try {
    conn = await connectToDB();

    const sql =
      "SELECT employees.*, categories.name AS category FROM employees LEFT JOIN categories ON employees.category_id = categories.id";

    const [rows] = await conn.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error in the getAllEmployees controller: ", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  } finally {
    if (conn) conn.end();
  }
};

export const removeEmployee = async (req, res) => {
  let conn = null;
  try {
    const { id } = req.params;
    conn = await connectToDB();

    const checkSql = "SELECT * FROM employees WHERE id = ?";
    const [employee] = await conn.query(checkSql, [id]);

    const deleteSql = "DELETE FROM employees WHERE id = ?";

    await conn.query(deleteSql, [id]);

    try {
      await fs.unlink(`./uploads/${employee[0].image}`);
    } catch (error) {
      console.error("Error deleting image: ", error.message);
      throw error;
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error in the removeEmployee controller: ", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  } finally {
    if (conn) conn.end();
  }
};

export const editEmployee = async (req, res) => {
  let conn = null;
  try {
    const { name, email, salary, address, category_id } = req.body;
    const { id } = req.params;
    const file = req.file;

    conn = await connectToDB();

    const sql = "UPDATE employees SET ? WHERE id = ?";

    let updatedData = { name, email, salary, address, category_id };

    if (file) {
      updatedData.image = file.filename;
    }

    await conn.query(sql, [updatedData, id]);

    res.status(200).json({ message: "Employee data updated successfully" });
  } catch (error) {
    console.error("Error in the editEmployee controller: ", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  } finally {
    if (conn) conn.end();
  }
};
