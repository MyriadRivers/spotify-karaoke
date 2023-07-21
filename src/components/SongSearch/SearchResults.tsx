import { styled } from "styled-components"
import SongInfo from "../../types";
import SongInfoDisplay from "../SongInfoDisplay";
import { UIEvent } from "react";

const SearchResultsStyled = styled.div`
    background: blue;
    height: 300px;
    width: 100%;
    overflow: scroll;
    position: absolute;
`

const SearchResults = ({songs, onSelect, onMaxScroll} : {songs: SongInfo[], onSelect: Function, onMaxScroll: Function}) => {
    const checkScroll = (event: UIEvent<HTMLElement>) => {
        const target = event.currentTarget;
        const atBottom: boolean = target.scrollHeight - target.clientHeight === target.scrollTop;

        if (atBottom) {
            console.log("reached the bottom!");
            onMaxScroll();
        }
    }

    return (
        <SearchResultsStyled onScroll={checkScroll}>
            {
                songs.map((song, index) => {
                    return (
                        <div style={{background: index % 2 === 0 ? "turquoise" : "pink"}} key={index}>
                            <SongInfoDisplay songInfo={song} onClick={onSelect}/>
                        </div>  
                    );
                })
            }
        </SearchResultsStyled>
    );
}

export default SearchResults;