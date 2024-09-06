const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (mailOptions) => {
  const { SMTP_HOST, SMTP_PORT, EMAIL_USERNAME, EMAIL_PASS } = process.env;

  let transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
    secure: true,
  });

  return await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err);
      } else {
        console.log("resolved bhai resolved");
        resolve(info);
      }
    });
  });

  // let info = await transporter.sendMail(mailOptions);

  console.log(`Message send :`);
};

module.exports = sendEmail;
