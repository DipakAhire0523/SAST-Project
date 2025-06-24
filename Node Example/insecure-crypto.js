// Insecure Cryptographic Practices
const crypto = require('crypto');
const express = require('express');
const app = express();

// VULNERABLE: Hardcoded secrets
const SECRET_KEY = 'my-super-secret-key-123'; // BAD: Hardcoded secret
const API_KEY = 'sk-1234567890abcdef'; // BAD: Hardcoded API key
const JWT_SECRET = 'jwt-secret-key'; // BAD: Weak secret

app.use(express.json());

// VULNERABLE: Weak hashing
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  
  // BAD: Using MD5 for password hashing
  const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
  
  // Simulate saving to database
  console.log(`Saving user: ${username}, password: ${hashedPassword}`);
  
  res.json({ message: 'User registered' });
});

// VULNERABLE: Weak encryption
function encryptData(data) {
  // BAD: Using deprecated/weak cipher
  const cipher = crypto.createCipher('des', SECRET_KEY);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// VULNERABLE: Insecure random number generation
app.get('/token', (req, res) => {
  // BAD: Math.random() is not cryptographically secure
  const token = Math.random().toString(36).substring(2);
  
  res.json({ token });
});

// VULNERABLE: Timing attack potential
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const storedPassword = 'admin123'; // Simulated stored password
  
  // BAD: String comparison vulnerable to timing attacks
  if (password === storedPassword) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

// VULNERABLE: Weak key generation
function generateApiKey() {
  // BAD: Predictable key generation
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `api_${timestamp}_${random}`;
}

module.exports = app;