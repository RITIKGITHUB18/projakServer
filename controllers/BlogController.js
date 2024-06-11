const { mongoose } = require("mongoose");
const Blog = require("../models/Blog");
const User = require("../models/User");
const { bucket } = require("../configuration/firebase");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

exports.upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },
});

const uploadImageToFirebase = async (file, folder) => {
  return new Promise((resolve, reject) => {
    const blob = bucket.file(folder + "/" + uuidv4() + "_" + file.originalname);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      reject(err);
    });

    blobStream.on("finish", async () => {
      const publicUrl = await blob.getSignedUrl({
        action: "read",
        expires: "03-09-2491", // Adjust expiry date as needed
      });
      resolve(publicUrl[0]);
    });

    blobStream.end(file.buffer);
  });
};

exports.createBlog = async (req, res) => {
  try {
    const { title, name, post, heading, para1, para2 } = req.body;

    if (!title || !name || !post || !heading || !para1 || !para2) {
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

    // const mainImage = await uploadImageToFirebase(
    //   req.files.mainImage[0],
    //   "blogs/main"
    // );
    // const profileImage = await uploadImageToFirebase(
    //   req.files.profileImage[0],
    //   "blogs/profile"
    // );
    const thumbnail = await uploadImageToFirebase(
      req.files.thumbnail[0],
      "blogs/thumbnail"
    );

    // Create blog in the database
    const blog = await Blog.create({
      title,
      mainImage:
        "https://firebasestorage.googleapis.com/v0/b/projak-2024.appspot.com/o/blogs%2FsecondHeaderImage.svg?alt=media&token=25c8d1c9-2483-4163-be4c-0a6f429453e6",
      thumbnail: thumbnail,
      name,
      post,
      heading,
      para1,
      para2,
    });

    // insert blog id in the userschema
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { blogs: blog._id } },
      { new: true }
    ).populate("blogs");

    return res.status(200).json({
      success: true,
      message: `Blog uploaded successfully`,
      data: blog,
      updatedUser,
    });
  } catch (error) {
    console.log("Error during creating the blog", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during creating blog",
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { blogId, title, name, post, heading, para1, para2 } = req.body;

    if (!blogId) {
      return res.status(404).json({
        success: false,
        message: "NoticeId are required",
      });
    }

    const blogData = await Blog.findById(blogId);

    if (!blogData) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (title !== undefined) {
      blogData.title = title;
    }
    if (name !== undefined) {
      blogData.name = name;
    }
    if (post !== undefined) {
      blogData.post = post;
    }
    if (heading !== undefined) {
      blogData.heading = heading;
    }
    if (para1 !== undefined) {
      blogData.para1 = para1;
    }
    if (para2 !== undefined) {
      blogData.para2 = para2;
    }

    //! toDo : file upload controller for the uploading the image and deleting the older image
    // if (req.files.mainImage) {
    //   blogData.mainImage = await uploadImageToFirebase(
    //     req.files.mainImage[0],
    //     "blogs/main"
    //   );
    // }
    // if (req.files.profileImage) {
    //   blogData.profileImage = await uploadImageToFirebase(
    //     req.files.profileImage[0],
    //     "blogs/profile"
    //   );
    // }
    if (req.files.thumbnail) {
      blogData.thumbnail = await uploadImageToFirebase(
        req.files.thumbnail[0],
        "blogs/thumbnail"
      );
    }

    await blogData.save();

    return res.status(200).json({
      success: true,
      data: blogData,
    });
  } catch (error) {
    console.log("Error occured while updating the Blog", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the blog",
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.body;

    const userId = req.user.id;

    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "BlogId is required",
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          blogs: blogId,
        },
      },
      { new: true }
    );

    const deletedBlog = await Blog.findByIdAndDelete({ _id: blogId });

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log("Error occur while deleting the blog", error);
    return res.status(500).json({
      success: false,
      messsage: "An error ocurred while deleting the blog",
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const allBlog = await Blog.find({});
    return res.status(200).json({
      success: true,
      message: "All blog fetched successfully",
      data: allBlog,
    });
  } catch (error) {
    console.log("Error occured during fetching all blogs", error);
    return res.status(500).json({
      success: false,
      message: "Some error occured during fetching all blogs",
    });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blogId = req.query.blogId;
    console.log("blogId in server", blogId);
    console.log("req.body in server", req.query);
    // Find the blog by ID in the database
    const blog = await Blog.findById(blogId);

    // If the blog is not found, return a 404 error
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // If the blog is found, return it in the response
    res.status(200).json({
      success: true,
      message: "blog fetched by Id",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// mongodb;
//storage.googleapis.com/projak-2024.appspot.com/6047ee3c-1953-4c3f-9998-d5ee53e3d18a_AIT-Pune-Logo.webp

// https: firebase;
//https://firebasestorage.googleapis.com/v0/b/projak-2024.appspot.com/o/f35f9ef0-fa16-464f-9f46-08db868b0935_AIT-Pune-Logo.webp?alt=media&token=7e6991fc-b901-45d9-bcb0-699edb6ec472
