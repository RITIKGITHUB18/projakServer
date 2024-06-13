const express = require("express");
const {
  uploadJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getJobById,
} = require("../controllers/Career");
const multer = require("multer");
const { verifyUser } = require("../middlewares/verifyuser");
const upload = multer();
const router = express.Router();

router.post("/upload-job", verifyUser, upload.none(), uploadJob);
router.put("/update-job", verifyUser, upload.none(), updateJob);
router.delete("/delete-job", verifyUser, deleteJob);
router.get("/all-job", getAllJobs);
router.get("/getJobById", getJobById);

module.exports = router;
