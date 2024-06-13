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

const router = express.Router();

router.post(
  "/create-blog",
  verifyUser,
  upload.fields([{ name: "thumbnail", maxCount: 1 }]),
  createBlog
);
router.put(
  "/update-blog",
  verifyUser,
  upload.fields([{ name: "thumbnail", maxCount: 1 }]),
  updateBlog
);
router.delete("/delete-blog", verifyUser, deleteBlog);
router.get("/all-blogs", getAllBlogs);
router.get("/getBlogById", getBlogById);

module.exports = router;
