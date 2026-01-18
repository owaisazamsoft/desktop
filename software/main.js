// server.js
const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const basePath = process.pkg ? path.dirname(process.execPath) : __dirname;
const distPath = path.join(basePath, 'dist');

const app = express();
const PORT = 3000;

// Serve static Vue files
app.use(express.static(distPath));

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express' });
});

// SPA fallback for Vue router
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {


    console.log(`Server running at http://localhost:${PORT}`);
    exec(`start chrome --app=http://localhost:${PORT}`, (err) => {
      if (err) console.error('Failed to open Chrome in app mode:', err);
    });


});
