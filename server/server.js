const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const spotifyWebApi = require('spotify-web-api-node');
const CONFIG = require('../config.json');

const app = express();
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(cors());  // CORS middleware
app.use(bodyParser.json()); // JSON middleware
app.use(bodyParser.urlencoded({ extended: true }))

const port = 3001;

// Request authorization from Spotify Web API 
app.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyApi = new spotifyWebApi({
    redirectUri: CONFIG.redirect_uri,
    clientId: CONFIG.client_id, 
    clientSecret: CONFIG.client_secret,
  })

  spotifyApi.authorizationCodeGrant(code).then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    })
  }).catch(err => {
    res.sendStatus(400)
  })
})

// refesh using refresh token
app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: CONFIG.redirect_uri,
    clientId: CONFIG.client_id,
    clientSecret: CONFIG.client_secret,
    refreshToken,
  });

  spotifyApi.refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in
      })
    }).catch(err => {
      res.sendStatus(400);
    }
  );
})

app.get('/test', (req, res) => {
  console.log("BRUH")
  res.json({
    text: "bruh lmao"
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});