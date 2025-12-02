const express = require('express');
const cookieParser = require('cookie-parser');
const https = require('https');
const fs = require('fs');
const app = express();
const port = 3001;

const options = {
  key: fs.readFileSync('certs/server.key'),
  cert: fs.readFileSync('certs/server.cert')
};

const tld = process.env.TLD || 'corp';
const domain = `tao.${tld}`;

app.use(cookieParser());

// Enable CORS for FE servers
app.use((req, res, next) => {
  const origin = req.headers.origin;
  // Allow both abc and local domains
  if (origin && (origin.includes(`abc.${domain}`) || origin.includes(`local.${domain}`))) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
});

app.get('/set-cookie', (req, res) => {
  // Set a cookie visible to .tao.${tld} subdomains
  const cookieValue = new Date().toISOString();
  res.cookie('test-cookie', cookieValue, { 
    domain: `abc-be.${domain}`, 
    path: '/',
    httpOnly: false, // Allow JS access for demonstration
    secure: true, // Required for SameSite=None if we were using it, but good practice for HTTPS
    sameSite: 'None' // Allow cross-site usage
  });
  console.log(`Cookie set on abc-be.${domain}`);
  res.redirect(`https://abc.${domain}:3002`);
});

app.get('/ping', (req, res) => {
  const cookie = req.cookies['test-cookie'];
  console.log(`Ping received. Cookie present: ${!!cookie}`);
  res.json({
    cookiePresent: !!cookie,
    cookieValue: cookie || null,
    timestamp: new Date().toISOString()
  });
});

https.createServer(options, app).listen(port, () => {
  console.log(`BE Server running at https://abc-be.${domain}:${port}`);
});
