const nodeMailer = require('nodemailer')
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pateriyaaashish255@gmail.com',
      pass: 'gkksmvpyrkkypogt',
    },
  });
  const otp = Math.floor(1000 + Math.random() * 9000);
  const mailOptions = {
    from: process.env.SMTP_Email,
    to: "userEmail",
    subject: 'OTP for Login',
    text: `Your OTP for login is: ${otp}`,
  };


module.exports = { transporter, mailOptions , otp}
