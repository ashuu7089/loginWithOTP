const user = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { transporter, otp } = require('../services/emailService')
const fs = require('fs')
const path = require('path')

// API for login with OTP
const userLogin = async (req, res) => {
    const { userEmail } = req.body;
    try {

        await transporter.sendMail({
            from: process.env.sendMailer,
            to: userEmail,
            subject: 'OTP for Login',
            text: `Your OTP for login is: ${otp}`,
        });
        user[userEmail] = { otp };
        return res.status(200).json({
            success: true,
            message: 'OTP sent successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// API for verify user Otp
const verifyUserOtp = async (req, res) => {
    const { userEmail, otp } = req.body;
    try {
        if (user[userEmail] && user[userEmail].otp === otp) {
            const token = jwt.sign({ userEmail }, process.env.JWT, { expiresIn: '1h' });
            const userData = await user.create({ userEmail });
            delete user[userEmail].otp;
            return res.status(201).json({
                success: true,
                message: "Verify otp successfully",
                data: token,
                userData: userData
            })
        } else {
            return res.status(401).json({
                success: false,
                error: 'Invalid OTP'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//API for uploadFile
const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success : false,
                message : "file not found"
            })
        }
        const fileContent = req.file.buffer.toString();
        const updatedContent = fileContent.replace(/node/gi, 'express');
        const uploadFolder = path.join(__dirname, '../', 'uploads');
        const fileName = 'updatedFile.txt';
        const filePath = path.join(uploadFolder, fileName);

        fs.writeFile(filePath, updatedContent, (err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
            return res.status(200).json({
                success: true,
                message: "File uploaded and updated successfully"
            });
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    userLogin,
    verifyUserOtp,
    uploadFile
}
