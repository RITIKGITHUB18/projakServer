const express = require("express");
const {
  upload,
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
} = require("../controllers/BlogController");
const { verifyUser } = require("../middlewares/verifyuser");
const multer = require("multer");

const router = express.Router();

router.post(
  "/create-blog",
  verifyUser,
  (req, res, next) => {
    upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "mainImage", maxCount: 1 },
    ])(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ success: false, message: err.message });
      } else if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
      next();
    });
  },
  createBlog
);

router.put(
  "/update-blog",
  verifyUser,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "mainImage", maxCount: 1 },
  ]),
  updateBlog
);
router.delete("/delete-blog", verifyUser, deleteBlog);
router.get("/all-blogs", getAllBlogs);
router.get("/getBlogById", getBlogById);

module.exports = router;
