# SpotiPi
A small project that uses the Spotify API and d3.js to display anylitics about a user's Spotify library.

## Project Setup

First, run `npm install` in both the `client` and `server` directories.

Then, create your .env files in both the `client` and `server` in the format shown below:

CLIENT_ID = "client ID here"
CLIENT_SECRET = "client secret here"
REDIRECT_URI = "http://localhost:3000/"

To get this app working on your local machine, you must create an app through Spotify's Developer Console, and add "http://localhost:3000/" to your project's redirect URIs. See [here](https://spotify.dev/documentation/web-api/quick-start/) for more info.

### client

In the `client` directory, you have access to the following commands:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

### server

In the server directory, you have access to the following commands:

#### `npm run dev`

Runs the express server in development mode, using nodemon to hot reload on save.