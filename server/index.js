const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const spotifyWebApi = require('spotify-web-api-node')
const CONFIG = require('../config.json');

const app = express();
app.use(cors());  // CORS middleware
app.use(bodyParser.json()); // JSON middleware

const port = 3001;

// Request authorization from Spotify Web API
app.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyAPI = new spotifyWebApi({
    redirectUri: CONFIG.redirect_uri,
    clientId: CONFIG.client_id,
    clientSecret: CONFIG.client_secret,
  })

  spotifyAPI.authorizationCodeGrant(code).then(data => {
    res.json({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
    }).catch(err => {
      res.sendStatus(400)
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});