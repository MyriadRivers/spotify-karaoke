import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { ChangeEvent, useState } from "react";
import SongInfo from "../../types";
import { styled } from "styled-components";
import SearchResults from "./SearchResults";

const SongSearchStyled = styled.div`
    background: red;
    position: relative;
    
    .search-bar {
        display: flex;
        justify-content: space-between;
    }

    input {
        color: darkcyan;
        width: 100%;
    }

    button {
        background: purple;
    }
`

const SongSearch = ({api}: {api: SpotifyApi}) => {
    const [songName, setSongName] = useState("");
    const [prevSongName, setPrevSongName] = useState("");
    const [showingResults, setShowingResults] = useState(false);
    const [page, setPage] = useState(0);
    const [results, setResults]= useState(Array<SongInfo>);
    const [resetScroll, setResetScroll] = useState(false);

    const songInputChange = (event: ChangeEvent) => {
        if (event.target) {
            let target = event.target as HTMLInputElement;
            setSongName(target.value);
        }
    };

    const selectSong = async (song: string) => {
        console.log(song);
        const response = await fetch("/lyrics", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({a: 1, b: 2})
        })
        console.log("response:\n")
        console.log(response.text());
        // Hide dropdown
        setShowingResults(false);
        // Reset results and page
        setResults([]);
        setPage(0);
    }

    const getSongs = async () => {
        setResetScroll(prevSongName !== songName);

        let newPage = prevSongName !== songName ? 0 : page + 1;
        let rawResults = await api.search(songName, ["track"], undefined, 10, newPage * 10);
        let tracks = rawResults.tracks.items;
        let songInfoResults: Array<SongInfo> = tracks.map((track) => {
            return {
                name: track.name,
                artists: track.artists.map((artist) => {
                    return artist.name;
                }),
                image: track.album.images[2] 
            }
        })
        // Show new results, or append if scrolling down
        setPage(newPage);
        setResults(prevSongName !== songName ? songInfoResults : [...results, ...songInfoResults]);
        setPrevSongName(songName);
        setShowingResults(true);
    }

    return (
        <SongSearchStyled>
            <div className="search-bar">
                <input onChange={songInputChange} placeholder={"Song Name"}/>
                <button onClick={getSongs}>Search</button>
            </div>
            { showingResults && <SearchResults songs={results} onSelect={selectSong} onMaxScroll={getSongs} resetScroll={resetScroll}/> }
        </SongSearchStyled>
    );
};

export default SongSearch;