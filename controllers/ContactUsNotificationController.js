const {
  ContactFormNotification,
} = require("../mail/templates/ContactFormNotification");

const { ContactFormRes } = require("../mail/templates/ContactFormRes");

const mailSender = require("../utils/mailSender");
const Contact = require("../models/Contact");

exports.ContactUsNotificationController = async (req, res) => {
  try {
    const { email, name, phoneNo, message } = req.body;

    if (!email || !name || !phoneNo || !message) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    console.log("req.body", req.body);
    // Message to the company
    await mailSender(
      "ritikrog90@gmail.com",
      "Projak",
      "User Support",
      ContactFormNotification(name, email, phoneNo, message)
    );
    console.log("Second time");

    // Message to the user
    await mailSender(
      email,
      "Projak Support Team",
      "We got your message",
      ContactFormRes(name, email, phoneNo, message)
    );

    const contactus = await Contact.create({ email, name, phoneNo, message });

    return res.status(200).json({
      success: true,
      data: contactus,
      message: "Email send successfully",
    });
  } catch (error) {
    console.log("Error while sending the message", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending the message!",
    });
  }
};
