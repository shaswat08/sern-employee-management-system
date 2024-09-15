import express from "express";
import multer from "multer";
import {
  addCategory,
  addEmployees,
  adminLogin,
  deleteCategory,
  editEmployee,
  getAllEmployees,
  getCategoryList,
  removeEmployee,
} from "../controllers/admin.controller.js";

const router = express.Router();

//setting up multer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/login", adminLogin);
router.post("/category", addCategory);
router.get("/category_list", getCategoryList);
router.delete("/category/:id", deleteCategory);
router.post("/add_employee", upload.single("image"), addEmployees);
router.get("/get_employees", getAllEmployees);
router.delete("/remove/:id", removeEmployee);
router.put("/edit/:id", upload.single("image"), editEmployee);

export default router;
