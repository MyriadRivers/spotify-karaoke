import styled from "styled-components";
import { SongInfo } from "../types";

const StyledSongInfoDisplay = styled.div`
    background-color: #191919;
    color: white;

    padding: 10px;
    display: flex;
    gap: 10px;

    .textInfo {
        display: flex;
        flex-direction: column;
    }

    .artists {
        color: lightgrey;
    }
`

const SongInfoDisplay = ({songInfo, onClick}: {songInfo: SongInfo, onClick: Function}) => {
    
    return (
        <StyledSongInfoDisplay onClick={() => onClick(songInfo)}>
            <img src={songInfo.image.url} alt="song album art"/>
            <div className={"textInfo"}>
                <b>{songInfo.name}</b>
                <div className={"artists"}>{songInfo.artists.join(", ")}</div>
            </div>
            
        </StyledSongInfoDisplay>
    )
}

export default SongInfoDisplay;