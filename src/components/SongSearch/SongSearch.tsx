import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { ChangeEvent, useEffect, useState } from "react";
import { SongInfo, Song } from "../../types";
import { styled } from "styled-components";
import SearchResults from "./SearchResults";
import { API, graphqlOperation } from "aws-amplify";

import * as subscriptions from '../../graphql/subscriptions'
import * as mutations from '../../graphql/mutations'
import { GraphQLSubscription } from "@aws-amplify/api";

var lyrics = require("../../assets/call-me-maybe-karaoke.json")

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

const SongSearch = ({api, setLyrics, setAudio}: {api: SpotifyApi, setLyrics: Function, setAudio: Function}) => {
    const [songName, setSongName] = useState("");
    const [selectedSong, setSelectedSong] = useState<SongInfo>();
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

    const selectSong = async (song: SongInfo) => {
        setSelectedSong(song);

        // CODE FOR COMMUNICATING WITH APPSYNC API, TOOK THIS DOWN FOR NOW TO MOCK UP

        // await API.graphql(
        //     graphqlOperation(mutations.requestKaraoke, {
        //         name: song.name, 
        //         artists: song.artists, 
        //         duration: song.duration, 
        //         id: song.id
        //     })
        // );
        
        // Hide dropdown
        setShowingResults(false);
        // Reset results and page
        setResults([]);
        setPage(0);

        // Place holder mock up for backend connection
        // TODO: take out the file from public folder when deploying
        setAudio("call-me-maybe-accompaniment.wav")
        setLyrics(lyrics)
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
                image: track.album.images[2],
                duration: track.duration_ms / 1000,
                id: track.id
            }
        })
        // Show new results, or append if scrolling down
        setPage(newPage);
        setResults(prevSongName !== songName ? songInfoResults : [...results, ...songInfoResults]);
        setPrevSongName(songName);
        setShowingResults(true);
    }
    
    useEffect(() => {
        API.graphql<GraphQLSubscription<Song>>(
            graphqlOperation(subscriptions.addedKaraoke, {name: 69, artists: 69, duration: 69, id: 69})
        ).subscribe({
            next: ({provider, value}) => {
                // @ts-ignore
                if (value.data !== undefined) console.log("Received: " + JSON.stringify(value.data.addedKaraoke))
            },
            error: (error) => console.warn(error)
        });
    }, [])

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