import React from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=379615396990420a9f3c65329eefb5a3&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

const functionCall = () => { 
    axios("http://localhost:3001/test", {}).then((response) => {
        console.log(response)
    })
}

export default function Login() {
    return <Container className="d-flex justify-content-center align-ite">
        <a className="btn btn-success btn-lg" href={AUTH_URL}>
            Login with Spotify
        </a>
        <button className="btn btn-fail btn-lg" onClick={functionCall}>
            Test the API
        </button>
    </Container>
}