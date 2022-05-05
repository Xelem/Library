const nodemailer = require('nodemailer');

const sendMail = async (user, url) => {
  // CREATE transport
  const newTransport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Mail Options
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: 'Password Reset ',
    text: `Your password reset token (Valid for only 10 minutes) ${url}`,
  };

  // Semd the email
  await newTransport.sendMail(mailOptions);
};

module.exports = sendMail;
