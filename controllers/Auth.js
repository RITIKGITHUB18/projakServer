const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    console.log("Signup");
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "Please enter all the fields properly",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password doesn't match, Please try again",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "user is registered Successfully",
      user,
    });
  } catch (error) {
    console.log("error while sign up", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during signup",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All field is required, please try again",
      });
    }

    // Check user exists or not
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, please signup",
      });
    }

    // Generate JWT,After password matching
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
      };
      console.log("Payload", payload);
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });

      user.toObject();
      user.token = token;
      user.password = undefined;

      // create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log("Error occured during login", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while login",
    });
  }
};

// exports.changepassword = async (req, res) => {
//   try {
//     const userDetails = await User.findById(req.user.id);
//     console.log("userDetails", userDetails);
//     const { oldPassword, newPassword, confirmPassword } = req.body;
//     if (!oldPassword || !newPassword || !confirmPassword) {
//       return res.status(403).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     if (newPassword !== confirmPassword) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Password and Confirm Password fields doesn't match, Please try again",
//       });
//     }

//     // Match between old passwords && update password in database
//     const user = await User.findById(req.user.id);
//     if (await bcrypt.compare(oldPassword, user.password)) {
//       const newHashedPassword = await bcrypt.hash(newPassword, 10);

//       const [updatedUserDetails, emailResponse] = await Promise.all([
//         User.findByIdAndUpdate(
//           req.user.id,
//           {
//             password: newHashedPassword,
//           },
//           { new: true }
//         ),
//         mailSender(
//           user.email,
//           passwordUpdated(
//             updatedUserDetails.email,
//             `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
//           )
//         ),
//       ]);
//       // const [updatedUserDetails] = await Promise.all([
//       //   User.findByIdAndUpdate(
//       //     req.user.id,
//       //     {
//       //       password: newHashedPassword,
//       //     },
//       //     { new: true }
//       //   ),
//       // ]);

//       console.log("Email sent successfully: ", emailResponse.response);
//       // console.log("Email sent successfully");

//       return res.status(200).json({
//         success: true,
//         message: "Password Changed successfully",
//       });
//     } else {
//       return res.status(500).json({
//         success: false,
//         message: "Please enter correct old password",
//       });
//     }
//   } catch (error) {}
// };
