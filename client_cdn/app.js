const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Create the server
const server = http.createServer((req, res) => {
  // Serve the `index.html` file for the root URL
  if (req.url === '/' || req.url === '/index.html') {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    // Handle 404 for other URLs
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => { 
  console.log(`Server running at http://localhost:${PORT}`);
});