// Insecure Dependencies and Configurations
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// VULNERABLE: Insecure CORS configuration
app.use(cors({
  origin: '*', // BAD: Allows all origins
  credentials: true // BAD: With wildcard origin
}));

// VULNERABLE: Insecure session configuration
app.use(session({
  secret: 'keyboard cat', // BAD: Weak secret
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false, // BAD: Should be true in production
    httpOnly: false, // BAD: Should be true
    maxAge: 24 * 60 * 60 * 1000 // BAD: Long session timeout
  }
}));

// VULNERABLE: Insecure cookie settings
app.use(cookieParser('weak-secret')); // BAD: Weak cookie secret

// VULNERABLE: Information disclosure
app.get('/debug', (req, res) => {
  // BAD: Exposing sensitive system information
  res.json({
    nodeVersion: process.version,
    platform: process.platform,
    env: process.env, // BAD: Exposing environment variables
    memory: process.memoryUsage(),
    uptime: process.uptime()
  });
});

// VULNERABLE: No rate limiting
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // BAD: No rate limiting allows brute force attacks
  if (username === 'admin' && password === 'password') {
    req.session.user = username;
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

// VULNERABLE: Insecure file upload
const multer = require('multer');
const upload = multer({ 
  dest: 'uploads/',
  // BAD: No file type restrictions
  // BAD: No file size limits
});

app.post('/upload', upload.single('file'), (req, res) => {
  // BAD: No file validation
  res.json({ 
    message: 'File uploaded',
    filename: req.file.filename 
  });
});

// VULNERABLE: Server-Side Request Forgery (SSRF)
const axios = require('axios');

app.post('/fetch', async (req, res) => {
  const url = req.body.url;
  
  try {
    // BAD: No URL validation allows SSRF
    const response = await axios.get(url);
    res.json({ data: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;