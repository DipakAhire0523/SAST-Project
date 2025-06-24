// SQL Injection Vulnerability Example
const mysql = require('mysql');
const express = require('express');
const app = express();

app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123', // Hardcoded password - SECURITY ISSUE
  database: 'testdb'
});

// VULNERABLE: SQL Injection
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  
  // BAD: Direct string concatenation allows SQL injection
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json(results);
  });
});

// VULNERABLE: Dynamic query construction
app.post('/search', (req, res) => {
  const searchTerm = req.body.search;
  
  // BAD: User input directly in query
  const query = `SELECT * FROM products WHERE name LIKE '%${searchTerm}%'`;
  
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

module.exports = app;