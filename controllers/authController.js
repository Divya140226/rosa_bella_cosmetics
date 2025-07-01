const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../models/db');


const client = require('../commonFunction/mobileSender');
const transporter = require('../commonFunction/emailSender');

const { findUserByEmail, createUser, updateUserPassword,findUserByEmailOrMobile,createUserWithOnlyIdentifier , updateUserDetails  } = require('../models/userModel');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await findUserByEmail(email);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser(name, email, hashedPassword);
  res.status(201).json({ status: true, message: 'User registered', user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  // Set token in HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: false, 
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: 'strict'
  });

  res.json({ message: 'Login successful' });
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await findUserByEmail(email);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_RESET_SECRET,
    { expiresIn: '15m' } 
  );
console.log('JWT_RESET_SECRET:', process.env.JWT_RESET_SECRET);

 
  res.json({ message: 'Reset token generated', token });
};
exports.resetPassword = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // Extract token from Bearer

  if (!token) return res.status(400).json({ message: 'Token required in Authorization header' });

  const { newPassword } = req.body;
  if (!newPassword) return res.status(400).json({ message: 'New password is required' });

  try {
    console.log('RESET_SECRET:', process.env.JWT_RESET_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
    console.log('DECODED PAYLOAD:', decoded);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await updateUserPassword(decoded.email, hashedPassword);

    res.json({ message: 'Password has been reset successfully' });
  } catch (err) {
    console.error('Token error:', err.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};



const otpStore = new Map();

// Request OTP
// exports.requestLoginOtp = async (req, res) => {
//   const { identifier } = req.body; // email or mobile

//   if (!identifier) {
//     return res.status(400).json({ message: 'Email or mobile is required' });
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000);
//   const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
//   otpStore.set(identifier, { otp, expiresAt });

//   const message = `Your login OTP is: ${otp}`;

//   try {
//     if (identifier.includes('@')) {
//       // Send email
//       await transporter.sendMail({
//         from: process.env.SMTP_EMAIL,
//         to: identifier,
//         subject: 'Your Login OTP',
//         text: message,
//       });
//       res.json({ message: 'OTP sent to email' });
//     } else {
//       // Send SMS using Twilio
//       await client.messages.create({
//         body: message,
//         from: process.env.TWILIO_PHONE_NUMBER,
//         to: `+91${identifier}`, // assuming Indian mobile number
//       });
//       res.json({ message: 'OTP sent to mobile' });
//     }
//   } catch (err) {
//     console.error('Error sending OTP:', err.message);
//     res.status(500).json({ message: 'Failed to send OTP' });
//   }
// };
exports.requestLoginOtp = async (req, res) => {
  const { identifier } = req.body; // email or mobile

  // Check if valid identifier format
  if (!identifier) {
    return res.status(400).json({ message: 'Email or mobile is required' });
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  otpStore.set(identifier, { otp, expiresAt });

  const message = `Your login OTP is: ${otp}`;

  try {
    if (identifier.includes('@')) {
      // Send OTP via email
      await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: identifier,
        subject: 'Your Login OTP',
        text: message,
      });
      res.json({ message: 'OTP sent to email' });
    } else {
      // Send OTP via SMS (mock)
      console.log(`Sending OTP to mobile: ${identifier} → ${otp}`);
      res.json({ message: 'OTP sent to mobile' });
    }
  } catch (err) {
    console.error('Error sending OTP:', err.message);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};
exports.verifyLoginOtp = async (req, res) => {
  const { identifier, otp } = req.body;
  const stored = otpStore.get(identifier);

  if (!stored) return res.status(400).json({ message: 'OTP not found' });
  if (Date.now() > stored.expiresAt)
    return res.status(400).json({ message: 'OTP expired' });
  if (String(stored.otp) !== String(otp))
    return res.status(400).json({ message: 'Invalid OTP' });

  // Check if user exists
  let user = await findUserByEmailOrMobile(identifier);

  // If not, create new user
  if (!user) {
    user = await createUserWithOnlyIdentifier(identifier);
    console.log('New user created after OTP:', user);
  }

  // Generate JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  otpStore.delete(identifier); // Clean up

  // Set cookie with token
  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.json({ status: true, message: 'Login successful' });

};
exports.updateUserDetails = async (req, res) => {
  const userId = req.params.id;
  const { name, mobile, address } = req.body;

  try {
    await updateUserDetails(userId, { name, mobile, address });
    res.json({ status: true, message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Profile update failed:', err);
    res.status(500).json({ status: false, message: 'Failed to update profile' });
  }
};
exports.logoutUser = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};
