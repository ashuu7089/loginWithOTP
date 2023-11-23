const express = require('express');
require('dotenv').config()
const app = express();
require('./dbConfig')
const port = 3000;
const router = require('./routers/userRouter')
app.use(express.json());

app.use('/', router)

// Sample users database (in-memory for demonstration purposes)

// Middleware to verify if the user is logged in
// const verifyLoggedIn = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized - User not logged in' });
//   }

//   try {
//     const decoded = jwt.verify(token, 'secretKey');
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Unauthorized - Invalid token' });
//   }
// };

// // Endpoint for login with OTP
// app.post('/login', (req, res) => {
//   const { email } = req.body;

//   // Generate OTP (for simplicity, using a random 4-digit number)
//   const otp = Math.floor(1000 + Math.random() * 9000);

//   // Send OTP via email (using nodemailer - replace with your email sending logic)
  
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return res.status(500).json({ error: 'Failed to send OTP via email' });
//     }

//     // Save the OTP in memory (for simplicity, use a database in a real application)
//     users[email] = { otp };
//     res.json({ message: 'OTP sent successfully' });
//   });
// });

// Endpoint to verify OTP and generate a token on success
// app.post('/verify-otp', (req, res) => {
//   const { email, otp } = req.body;

//   // Check if OTP is valid
//   if (users[email] && users[email].otp === otp) {
//     // Generate JWT token
//     const token = jwt.sign({ email }, 'secretKey', { expiresIn: '1h' });

//     // Save the user's email in the database (for simplicity, use a database in a real application)
//     // Clear the OTP after successful login
//     delete users[email].otp;

//     res.json({ token });
//   } else {
//     res.status(401).json({ error: 'Invalid OTP' });
//   }
// });

// // Endpoint to upload and process a .txt file
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// app.post('/upload-file', verifyLoggedIn, upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   // Read the uploaded file
//   const content = req.file.buffer.toString('utf-8');

//   // Replace 'node' with 'express' and save the file
//   const replacedContent = content.replace(/node/g, 'express');

//   fs.writeFileSync('./uploads/processed_file.txt', replacedContent);

//   res.json({ message: 'File processed and saved successfully' });
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
