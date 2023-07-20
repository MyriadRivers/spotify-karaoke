import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { ChangeEvent, useState } from "react";
import SongInfo from "../../types";
import SongInfoDisplay from "../SongInfoDisplay";

const SongSearch = ({api}: {api: SpotifyApi}) => {
    const [songName, setSongName] = useState("");
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
        setResults(songInfoResults)
    }

    return (
        <div>
            Song Name: <input onChange={songInputChange}/>
            <button onClick={getSongs}>Search</button>
            <br />
            {
                results.map((result) => {
                    return (
                        <SongInfoDisplay songInfo={result}/>
                    )
                })
            }
        </div>
    );
};

export default SongSearch;