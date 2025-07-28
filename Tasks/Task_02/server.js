require('dotenv').config();
const http = require('http');
const url = require('url');
const registerUser = require('./controllers/registerUser');
const createProfile = require('./controllers/createProfile'); 


const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // Route: POST /register
  if (req.method === 'POST' && parsedUrl.pathname === '/register') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      registerUser(req, res, body);
    });

  // Route: POST /profile
  } else if (req.method === 'POST' && parsedUrl.pathname === '/profile') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      createProfile(req, res, body);
    });

  } else {
    // Default 404 response
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
