import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId: "379615396990420a9f3c65329eefb5a3",
});

export default function Dashboard({ code }) {
    const accessToken = useAuth(code);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // update access token if changed
    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken])

    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return;

        spotifyApi.searchPlaylists(search).then(res => {
            console.log(res);
        })
    }, [search, accessToken])

    return <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
        <Form.Control
            type="search" 
            placeholder="Search for a playlist" 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
        />
    </Container>
}