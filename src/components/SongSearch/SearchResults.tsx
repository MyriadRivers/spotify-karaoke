import { styled } from "styled-components"
import SongInfo from "../../types";
import SongInfoDisplay from "../SongInfoDisplay";
import { MouseEventHandler } from "react";

const SearchResultsStyled = styled.div`
    background: blue;
    height: 300px;
    width: 100%;
    overflow: scroll;
    position: absolute;
`

const SearchResults = ({songs, onClick} : {songs: SongInfo[], onClick: Function}) => {
    return (
        <SearchResultsStyled>
            {
                songs.map((song, index) => {
                    return (
                        <div style={{background: index % 2 === 0 ? "turquoise" : "pink"}} key={index}>
                            <SongInfoDisplay songInfo={song} onClick={onClick}/>
                        </div>  
                    );
                })
            }
        </SearchResultsStyled>
    );
}

export default SearchResults;