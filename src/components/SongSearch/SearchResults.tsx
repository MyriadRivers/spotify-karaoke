import { styled } from "styled-components"
import SongInfo from "../../types";
import SongInfoDisplay from "../SongInfoDisplay";

const SearchResultsStyled = styled.div`
    background: blue;
    height: 300px;
    width: 100%;
    overflow: scroll;
    position: absolute;
`

const SearchResults = ({songs} : {songs: SongInfo[]}) => {
    return (
        <SearchResultsStyled>
            {
                songs.map((song) => {
                    return (
                        <SongInfoDisplay songInfo={song}/>
                    );
                })
            }
        </SearchResultsStyled>
    );
}

export default SearchResults;