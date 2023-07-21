import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { ChangeEvent, useState } from "react";
import SongInfo from "../../types";
import SongInfoDisplay from "../SongInfoDisplay";
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
    const [showingResults, setShowingResults] = useState(false);
    const [page, setPage] = useState(0);
    const [results, setResults]= useState(Array<SongInfo>);

    const songInputChange = (event: ChangeEvent) => {
        if (event.target) {
            let target = event.target as HTMLInputElement;
            setSongName(target.value);
        }
    };

    const getSongs = async () => {
        let rawResults = await api.search(songName, ["track"], undefined, 10, page);
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
        setResults(songInfoResults);
        setShowingResults(true);
    }

    return (
        <SongSearchStyled>
            <div className="search-bar">
                <input onChange={songInputChange} placeholder={"Song Name"}/>
                <button onClick={getSongs}>Search</button>
            </div>
            { showingResults && <SearchResults songs={results}/> }
        </SongSearchStyled>
    );
};

export default SongSearch;