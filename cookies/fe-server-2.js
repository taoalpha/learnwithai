const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const port = 3003;

const options = {
  key: fs.readFileSync('certs/server.key'),
  cert: fs.readFileSync('certs/server.cert')
};

const tld = process.env.TLD || 'corp';
const domain = `tao.${tld}`;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>FE Server 2 (local.tao.com)</title>
      <style>
        body { font-family: sans-serif; padding: 20px; }
        iframe { width: 100%; height: 400px; border: 2px solid #333; margin-top: 20px; }
      </style>
    </head>
    <body>
      <h1>FE Server 2</h1>
      <p>Domain: local.tao.com</p>
      <p>Below is an iframe embedding https://abc.${domain}:3002</p>
      
      <iframe src="https://abc.${domain}:3002"></iframe>
    </body>
    </html>
  `);
});

https.createServer(options, app).listen(port, () => {
  console.log(`FE Server 2 running at https://local.abc.com:${port}`);
});
