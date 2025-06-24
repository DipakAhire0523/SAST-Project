// Hardcoded Secrets and Insecure Configuration
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

// VULNERABLE: Hardcoded secrets and credentials
const DATABASE_URL = 'postgresql://admin:password123@localhost:5432/mydb';
const STRIPE_SECRET_KEY = 'sk_test_1234567890abcdefghijklmnop';
const AWS_ACCESS_KEY = 'AKIAIOSFODNN7EXAMPLE';
const AWS_SECRET_KEY = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY';
const SENDGRID_API_KEY = 'SG.1234567890abcdefghijklmnopqrstuvwxyz';
const GITHUB_TOKEN = 'ghp_1234567890abcdefghijklmnopqrstuvwxyz';

// VULNERABLE: Weak JWT configuration
const JWT_SECRET = '123456'; // BAD: Weak secret
const JWT_OPTIONS = {
  expiresIn: '30d', // BAD: Long expiration
  algorithm: 'none' // BAD: No signature verification
};

// VULNERABLE: Insecure authentication
app.post('/auth', async (req, res) => {
  const { username, password } = req.body;
  
  // Simulate user lookup
  const user = {
    id: 1,
    username: 'admin',
    password: '$2b$10$...' // Simulated hash
  };
  
  // BAD: Using weak comparison
  if (username === user.username && password === 'admin123') {
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      JWT_OPTIONS
    );
    
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// VULNERABLE: API key exposure
app.get('/config', (req, res) => {
  // BAD: Exposing sensitive configuration
  res.json({
    stripeKey: STRIPE_SECRET_KEY,
    awsKey: AWS_ACCESS_KEY,
    dbUrl: DATABASE_URL,
    version: '1.0.0'
  });
});

// VULNERABLE: Insecure password reset
const resetTokens = new Map();

app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  
  // BAD: Predictable reset token
  const resetToken = Math.random().toString(36).substring(2);
  resetTokens.set(email, resetToken);
  
  // BAD: Token in response (should be sent via email only)
  res.json({ 
    message: 'Reset token generated',
    token: resetToken // BAD: Exposing token
  });
});

// VULNERABLE: Insecure direct object reference
const users = [
  { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin' },
  { id: 2, username: 'user', email: 'user@example.com', role: 'user' }
];

app.get('/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  
  // BAD: No authorization check
  const user = users.find(u => u.id === userId);
  
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// VULNERABLE: Debug endpoints in production
app.get('/debug/env', (req, res) => {
  // BAD: Exposing environment variables
  res.json(process.env);
});

app.get('/debug/users', (req, res) => {
  // BAD: Exposing all user data
  res.json(users);
});

module.exports = app;