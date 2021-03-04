const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const https = require('https');
const http = require('http');
const fs = require('fs');


// load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
//connectDB();

const app = express();

const PORT = process.env.PORT || 80;
var https_options = {
  key: fs.readFileSync(path.join(__dirname, '/ssl/HSSL-5e9d6eabbf28b.key')),
  cert: fs.readFileSync(path.join(__dirname, "/ssl/sevabhava_in.crt")),
  ca: [
          fs.readFileSync(path.join(__dirname, '/ssl/SectigoRSADomainValidationSecureServerCA.crt')),
          fs.readFileSync(path.join(__dirname, '/ssl/USERTrustRSAAAACA.crt')) 
       ]

};
app.all('*', ensureSecure);
http.createServer(app).listen(PORT)
https.createServer(https_options, app).listen(443, () =>
console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);


function ensureSecure(req, res, next){
  if(req.secure){
    // OK, continue
    return next();
  };
  // handle port numbers if you need non defaults
  // res.redirect('https://' + req.host + req.url); // express 3.x
  res.redirect('https://' + req.hostname + req.url); // express 4.x
  console.log('https://' + req.hostname + req.url);
}

// Body parser
app.use(express.json());

// Enable cors
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
// Routes
app.use('/api/v1/helps', require('./routes/stores'));
app.use('/api/v1/user', require('./routes/user'));
app.use('/api/v1/jusers', require('./routes/jusers'));
app.use('/api/v1/udhelp', require('./routes/udhelp'));
app.use('/api/v1/updates', require('./routes/updates'));
app.use('/api/v1/verify', require('./routes/verify'));
app.use('/api/v1/seeker', require('./routes/seeker'));
app.use('/api/v1/useeker', require('./routes/useeker'));




