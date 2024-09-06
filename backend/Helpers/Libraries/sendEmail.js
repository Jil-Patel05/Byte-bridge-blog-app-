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

  let info;
  try {
    info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response)
  } catch (error) {
    console.error('Error sending email: ', error)
  }
  console.log(`Message send : ${info.messageId}`);
};

module.exports = sendEmail;
