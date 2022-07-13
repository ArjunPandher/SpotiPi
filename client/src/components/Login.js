import React from 'react';
import { Container } from 'react-bootstrap';

const CLIENT_ID = "379615396990420a9f3c65329eefb5a3"
const REDIRECT_URI = "http://localhost:3000/"

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

export default function Login() {
    return <Container className="d-flex justify-content-center align-ite">
        <a className="btn btn-success btn-lg" href={AUTH_URL}>
            Login with Spotify
        </a>
    </Container>
}