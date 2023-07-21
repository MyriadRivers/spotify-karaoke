import { MouseEventHandler } from "react";
import SongInfo from "../types";

const SongInfoDisplay = ({songInfo, onClick}: {songInfo: SongInfo, onClick: Function}) => {
    return (
        <div onClick={() => onClick(songInfo.name)}>
            <b>{songInfo.name}</b>
            <br/>
            {songInfo.artists}
            <br/>
            <img src={songInfo.image.url} alt="song album art"/>
        </div>
    )
}

export default SongInfoDisplay;