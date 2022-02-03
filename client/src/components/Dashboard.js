import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import PlaylistSearchResult from './PlaylistSearchResult';
import PlaylistModal from './PlaylistModal';
import PiChart from './PiChart';

const spotifyApi = new SpotifyWebApi({
    clientId: "379615396990420a9f3c65329eefb5a3",
});

export default function Dashboard({ code }) {
    const accessToken = useAuth(code);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalPlaylist, setModalPlaylist] = useState(null);

    function handlePlaylist(playlist) {
        console.log(playlist);
        setModalShow(true);
        setModalPlaylist(playlist);
    }

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
                            songs: playlist.tracks,
                        }
                    }
                    return {
                        owner: playlist.owner.display_name,
                        title: playlist.name,
                        uri: playlist.uri,
                        // default image
                        cover_url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
                        songs: playlist.tracks,
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
            onChange={e => {setSearch(e.target.value); 
                // console.log(searchResults)
            }} 
        />
        <div className="flex-grow-1 my-2" style={{overflowY: "auto"}}>
            {
            searchResults.map(playlist => {
                return (
                <PlaylistSearchResult playlist={playlist} handlePlaylist={handlePlaylist} key={playlist.uri}/>)})
            }
            {
                searchResults.length === 0 && modalPlaylist !== null && (
                    <PiChart playlist={modalPlaylist}/>
                )
            }
        </div>
    </Container>
}