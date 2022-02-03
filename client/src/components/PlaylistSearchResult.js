import React from 'react'

export default function PlaylistSearchResult({ playlist, handlePlaylist }) {
    const handleClick = () => {
        handlePlaylist(playlist);
    }

    return <div className="d-flex m-2 align-items-center" style={{ cursor:'pointer' }} onClick={handleClick}>
        <img src={playlist.cover_url} style={{height:"64px", width:"64px"}} alt=""/>
        <div className="ml-3">
            <div>{playlist.title}</div>
            <div className="text-muted">{playlist.owner}</div>
        </div>
    </div>
}
