const nodemailer = require('nodemailer');

const sendEmail = async (user, url) => {
  // CREATE transport
  let newTransport;
  if (process.env.NODE_ENV === 'production') {
    newTransport = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        api_user: process.env.SENDGRID_USERNAME,
        api_key: process.env.SENDGRID_PASSWORD,
      },
    });
  } else {
    newTransport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

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

module.exports = sendEmail;
