const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const port = 3002;

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
      <title>FE Server 1 (abc.${domain})</title>
      <style>
        body { font-family: sans-serif; padding: 20px; }
        .cookie-box { margin-top: 20px; padding: 10px; border: 1px solid #ccc; background: #f9f9f9; }
      </style>
    </head>
    <body>
      <h1>FE Server 1</h1>
      <p>Domain: abc.${domain}</p>
      <button onclick="window.location.href='https://abc-be.${domain}:3001/set-cookie'">Go to BE to set cookie</button>
      <button onclick="pingBE()">Ping BE</button>
      
      <div class="cookie-box">
        <strong>Current Cookie Value:</strong>
        <div id="cookie-value">Checking...</div>
      </div>
      
      <div class="cookie-box">
        <strong>Ping Result:</strong>
        <div id="ping-result">Not pinged yet</div>
      </div>

      <script>
        function getCookie(name) {
          const value = \`; \${document.cookie}\`;
          const parts = value.split(\`; \${name}=\`);
          if (parts.length === 2) return parts.pop().split(';').shift();
        }

        const cookieVal = getCookie('test-cookie');
        document.getElementById('cookie-value').textContent = cookieVal ? cookieVal : 'Not found';

        async function pingBE() {
          const resultDiv = document.getElementById('ping-result');
          resultDiv.textContent = 'Pinging...';
          try {
            const res = await fetch('https://abc-be.${domain}:3001/ping', {
              credentials: 'include'
            });
            const data = await res.json();
            resultDiv.textContent = JSON.stringify(data, null, 2);
          } catch (e) {
            resultDiv.textContent = 'Ping Failed: ' + e.message;
          }
        }
      </script>
    </body>
    </html>
  `);
});

https.createServer(options, app).listen(port, () => {
  console.log(`FE Server 1 running at https://abc.${domain}:${port}`);
});
