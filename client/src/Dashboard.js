import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import PlaylistSearchResult from './PlaylistSearchResult';

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

    // update search
    useEffect(() => {
        console.log(`search: ${search} access token: ${accessToken}`)
        if (!search) return setSearchResults([]);
        if (!accessToken) return;

        let cancel = false;
        spotifyApi.searchPlaylists(search).then(res => {
            if (cancel) return; // do nothing if another request starts
            setSearchResults(
                res.body.playlists.items.map(playlist => {
                    if (playlist.images.length !== 0) {
                        const smallestPlaylistImage = playlist.images.reduce(
                            (smallest, image) => {
                                if (image.height < smallest.height) return image;
                                return smallest;
                            }, playlist.images[0]);

                        return {
                            owner: playlist.owner.display_name,
                            title: playlist.name,
                            uri: playlist.uri,
                            cover_url: smallestPlaylistImage.url,
                        }
                    }
                    return {
                        owner: playlist.owner.display_name,
                        title: playlist.name,
                        uri: playlist.uri,
                        // default image
                        cover_url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
                    }
                })
            );
        })
        return () => cancel = true;
    }, [search, accessToken])

    return <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
        <Form.Control
            type="search" 
            placeholder="Search for a playlist" 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
        />
        <div className="flex-grow-1 my-2" style={{overflowY: "auto"}}>
            {searchResults.map(playlist => (
                <PlaylistSearchResult playlist={playlist} key={playlist.uri}/>
            ))}
        </div>
    </Container>
}