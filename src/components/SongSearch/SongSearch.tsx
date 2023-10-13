import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SongInfo, Song } from "../../types";
import { styled } from "styled-components";
import SearchResults from "./SearchResults";
import { API, graphqlOperation } from "aws-amplify";

import * as subscriptions from '../../graphql/subscriptions'
import * as mutations from '../../graphql/mutations'
import { GraphQLSubscription } from "@aws-amplify/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faAddressCard, faAngry } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

var lyrics = require("../../assets/call-me-maybe-karaoke.json")

const SongSearchStyled = styled.div`
    background: red;
    position: relative;
    /* display: flex; */

    .searchBar {
        display: flex;
        justify-content: space-between;
    }

    input {
        color: white;
        background: #222222;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12.5pt;

        padding: 0pt 0pt 0pt 20pt;
        border: none;
        /* border-radius: 20pt 0pt 0pt 20pt; */

        width: 100%;
    }

    button {
        background: #222222;
        color: lightgrey;
        border: none;
        width: 40pt;
        aspect-ratio: 1 / 1;
        /* border-radius: 0pt 20pt 20pt 0pt; */

        &:hover {
            color: white;
            cursor: pointer;
        }
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

    const searchBarRef = useRef<HTMLInputElement>(null);
    const searchButtonRef = useRef<HTMLButtonElement>(null);
    const searchResultsRef = useRef<HTMLDivElement>(null);
    
    const showing = useRef<boolean | undefined>(false);

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
        
        hideResults();

        // Place holder mock up for backend connection
        // TODO: take out the file from public folder when deploying
        setAudio("call-me-maybe-accompaniment.wav")
        setLyrics(lyrics)
    }

    const hideResults = () => {
        // Hide dropdown
        setShowingResults(false);
        showing.current = false;
        // Reset results and page
        setResults([]);
        setPage(0);
        if (searchBarRef.current) {
            searchBarRef.current.value = ""
        }
    }

    const getSongs = async () => {
        if (songName.length > 0) {
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
    }

    const searchHotKey = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            if (searchButtonRef.current && !showing.current) {
                searchButtonRef.current.click();
                showing.current = true;
            }
        }
    }

    const escapeHotKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            if (searchButtonRef.current && showing.current) {
                hideResults();
            }
        }
    }

    const mouseEscapeHotKey = (e: MouseEvent) => {
        if (searchResultsRef.current && e.target !== null) {
            const clickInside = searchResultsRef.current.contains(e.target as Node);
            if (!clickInside) {
                hideResults();
            }
        }
    }
    
    useEffect(() => {
        // Hitting enter when the text field is selected is the same as pressing the search button
        if (searchBarRef.current) {
            searchBarRef.current.addEventListener("keypress", searchHotKey);
        }
        window.addEventListener("keydown", escapeHotKey);
        window.addEventListener("mousedown", mouseEscapeHotKey);

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
            <div className="searchBar">
                <input onChange={songInputChange} placeholder={"What do you want to sing along to?"} ref={searchBarRef}/>
                <button onClick={getSongs} ref={searchButtonRef}><FontAwesomeIcon icon={faSearch} size={"lg"} /></button>
            </div>
            { showingResults && <SearchResults songs={results} onSelect={selectSong} onMaxScroll={getSongs} resetScroll={resetScroll} ref={searchResultsRef}/> }
        </SongSearchStyled>
    );
};

export default SongSearch;