const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const spotifyWebApi = require('spotify-web-api-node');
const CONFIG = require('../config.json');
const axios = require('axios');

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
  const spotifyApi = new spotifyWebApi({
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

app.get('/genres', (req, res) => {
  const href = req.query.tracks;
  const accessToken = req.query.accessToken;
  axios.get(href, {
    params: {access_token: accessToken},
  }).then((response) => {
    // spotify API only supports up to 50 artists at one time, and we only get the primary artist of each track
    const artistList = response.data.items.slice(0, 50).map(( item ) => item.track.artists[0].id);
    const artistString = artistList.join(',');
    
    axios.get("https://api.spotify.com/v1/artists", {
      params: {
        access_token: accessToken,
        ids: artistString,
      },
    }).then((response2) => {
      const genre_map = {};

      let count = 0;

      response2.data.artists.forEach((item, index) => {
        for (let i = 0; i < item.genres.length; i++) {
          let genre = item.genres[i];
          if (genre_map[genre]) {
            genre_map[genre] += 1;
          } else {
            genre_map[genre] = 1;
          }
          count++;
          break; // only taking primary genre of each artist
        }
      });

      const dataset = [];
      Object.keys(genre_map).forEach((key) => {
        dataset.push({ name: key, count: genre_map[key], percentage: Math.round(genre_map[key]/count * 10000) / 100 });
      });

      console.log(dataset);

      res.json(dataset);
    }).catch((err) => {
      console.log(err.response);
    })
  }).catch((err) => {
    console.log(err.response);
  });
})

app.get('/genres', (req, res) => {
  const href = req.query.genres;

  const accessToekn = req.query
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});