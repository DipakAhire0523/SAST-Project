// Cross-Site Scripting (XSS) Vulnerabilities
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// VULNERABLE: Reflected XSS
app.get('/search', (req, res) => {
  const query = req.query.q;
  
  // BAD: User input directly rendered without sanitization
  const html = `
    <html>
      <body>
        <h1>Search Results</h1>
        <p>You searched for: ${query}</p>
        <div id="results">No results found</div>
      </body>
    </html>
  `;
  
  res.send(html);
});

// VULNERABLE: DOM-based XSS potential
app.get('/profile', (req, res) => {
  const username = req.query.user;
  
  const html = `
    <html>
      <body>
        <script>
          // BAD: User input in JavaScript context
          var username = "${username}";
          document.getElementById('welcome').innerHTML = 'Welcome ' + username;
        </script>
        <div id="welcome"></div>
      </body>
    </html>
  `;
  
  res.send(html);
});

// VULNERABLE: Stored XSS simulation
let comments = [];

app.post('/comment', (req, res) => {
  const comment = req.body.comment;
  
  // BAD: Storing unsanitized user input
  comments.push(comment);
  
  res.json({ message: 'Comment added' });
});

app.get('/comments', (req, res) => {
  let html = '<html><body><h1>Comments</h1>';
  
  // BAD: Rendering stored user input without sanitization
  comments.forEach(comment => {
    html += `<div>${comment}</div>`;
  });
  
  html += '</body></html>';
  res.send(html);
});

module.exports = app;