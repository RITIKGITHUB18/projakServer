const nodemailer = require("nodemailer");

// GMAIL_EMAIL = process.env.GMAIL_EMAIL,
//     // Sender's Email
//     SENDER_EMAIL = 'anyemail@anydomain.anyextension',
//     // Gmail Client ID
//     CLIENT_ID = process.env.GMAIL_CLIENT_ID,
//     // Gmail Client Secret
//     CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET,
//     // Gmail Refresh Token
//     REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN

// ! ********************* watch this youtube video **********
//! https://www.youtube.com/watch?v=oFwMlIMmqQY&t=3402s :- configure this setting after site being hosted

const mailSender = async (email, from, title, body) => {
  // with the help of this function we send mail of otp;
  try {
    const SENDER_EMAIL = "info@projakinfotech.com";
    let transporter = nodemailer.createTransport({
      // we send mail with the help of transporter and here MAIL_USER , MAIL_PASS contain app password of that email which send email
      service: "Gmail",

      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_EMAIL,
        clientId: process.env.MAIL_CLIENT_ID,
        clientSecret: process.env.MAIL_CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let info = await transporter
      .sendMail({
        from: `${from} <${SENDER_EMAIL}>`,
        to: `${email}`,
        subject: `${title}`,
        html: `${body}`,
      })
      .then((success) => "Email sent successfully")
      .catch((err) => "Some error in sending the mail");

    console.log(info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = mailSender;
