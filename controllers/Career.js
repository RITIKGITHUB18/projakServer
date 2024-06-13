const { mongoose } = require("mongoose");
const Career = require("../models/Career");
const User = require("../models/User");

exports.uploadJob = async (req, res) => {
  try {
    const { jobId, location, jobTitle, terms, requirement, jobDescription } =
      req.body;
    console.log("Upload-job", req.body);
    if (
      !jobId ||
      !location ||
      !jobTitle ||
      !terms ||
      !requirement ||
      !jobDescription
    ) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userId = req.user.id;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "user does not exist, Please login/signup",
      });
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user does not exist, Please Signup",
      });
    }

    // Create blog in the database
    const jobDetail = await Career.create({
      jobId,
      location,
      jobTitle,
      terms,
      requirement,
      jobDescription,
    });

    // insert blog id in the userschema
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { career: jobDetail._id } },
      { new: true }
    ).populate("career");

    return res.status(200).json({
      success: true,
      message: `job uploaded successfully`,
      data: jobDetail,
      updatedUser,
    });
  } catch (error) {
    console.log("Error during uploading the job detail", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during uploading the job detail",
    });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const {
      jobObjectId,
      jobId,
      location,
      jobTitle,
      terms,
      requirement,
      jobDescription,
    } = req.body;

    console.log("Update Req.body", req.body);

    if (!jobObjectId) {
      return res.status(404).json({
        success: false,
        message: "jobObjectId are required",
      });
    }

    const jobData = await Career.findById(jobObjectId);

    if (!jobData) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (jobId !== undefined) {
      jobData.jobId = jobId;
    }
    if (location !== undefined) {
      jobData.location = location;
    }
    if (jobTitle !== undefined) {
      jobData.jobTitle = jobTitle;
    }
    if (terms !== undefined) {
      jobData.terms = terms;
    }
    if (requirement !== undefined) {
      jobData.requirement = requirement;
    }
    if (jobDescription !== undefined) {
      jobData.jobDescription = jobDescription;
    }

    await jobData.save();

    return res.status(200).json({
      success: true,
      data: jobData,
    });
  } catch (error) {
    console.log("Error occured while updating the job details", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the job details",
    });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const { jobObjectId } = req.body;

    const userId = req.user.id;

    if (!jobObjectId) {
      return res.status(400).json({
        success: false,
        message: "jobObjectId is required",
      });
    }

    const job = await Career.findById(jobObjectId);
    if (!job) {
      return res.status(404).json({ message: "job detail not found" });
    }

    await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          career: jobObjectId,
        },
      },
      { new: true }
    );

    await Career.findByIdAndDelete({ _id: jobObjectId });

    return res.status(200).json({
      success: true,
      message: "job deleted successfully",
    });
  } catch (error) {
    console.log("Error occur while deleting the job", error);
    return res.status(500).json({
      success: false,
      messsage: "An error ocurred while deleting the job",
    });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const allJob = await Career.find({});
    return res.status(200).json({
      success: true,
      message: "All Job fetched successfully",
      data: allJob,
    });
  } catch (error) {
    console.log("Error occured during fetching all Job", error);
    return res.status(500).json({
      success: false,
      message: "Some error occured during fetching all Job",
    });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const jobObjectId = req.query.jobObjectId;

    const job = await Career.findById(jobObjectId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({
      success: true,
      message: "Job fetched by Id",
      data: job,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
