const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (mailOptions) => {
  console.log("function called ho gaya");
  const { SMTP_HOST, SMTP_PORT, EMAIL_USERNAME, EMAIL_PASS } = process.env;

  let transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASS,
    },
    tls: { ciphers: "SSLv3" },
  });
  // return await new Promise((resolve, reject) => {
  //   transporter.sendMail(mailOptions, (err, info) => {
  //     if (err) {
  //       reject(err);
  //     } else {
  //       console.log("resolved bhai resolved");
  //       resolve(info);
  //     }
  //   });
  // });
  console.log("currently above this code");
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("executed mail sent to catt");
  } catch (error) {
    console.log("error aa gy he re");
    console.log(error);
  }
  console.log(`Message send`);
};

module.exports = sendEmail;
