import SongInfo from "../types";

const SongInfoDisplay = ({songInfo}: {songInfo: SongInfo}) => {
    return (
        <div>
            <b>{songInfo.name}</b>
            <br/>
            {songInfo.artists}
            <br/>
            <img src={songInfo.image.url} alt="song album art"/>
        </div>
    )
}

export default SongInfoDisplay;