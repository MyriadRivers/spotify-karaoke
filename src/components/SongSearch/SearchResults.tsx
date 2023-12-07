import { styled } from "styled-components"
import { SongInfo } from "../../types";
import SongInfoDisplay from "../SongInfoDisplay";
import { UIEvent, forwardRef, useEffect, useRef } from "react";

const SearchResultsStyled = styled.div`
    background: #222222;
    height: 80vh;
    width: 100%;
    overflow: auto;
    position: absolute;
    z-index: 1000;

    scrollbar-color: #FFFFFF40 #FFFFFF00;
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-track {
        /* background: orange; */
    }
    &::-webkit-scrollbar-thumb {
        background: #FFFFFF40;
    }
`

interface Props {
    songs: SongInfo[];
    onSelect: Function;
    onMaxScroll: Function;
    resetScroll: boolean;
}
const SearchResults = forwardRef<HTMLDivElement, Props>(({ songs, onSelect, onMaxScroll, resetScroll }, ref) => {
    const scrollWindow = useRef<HTMLDivElement | null>(null);

    // Chrome allows decimals for scroll top pixels, we allow 1 pixel leeway for checking if max scroll
    const MIN_DIF = 1;

    useEffect(() => {
        if (scrollWindow.current) scrollWindow.current.scrollTop = 0;
    }, [resetScroll])

    const checkScroll = (event: UIEvent<HTMLElement>) => {
        const target = event.currentTarget;
        const atBottom: boolean = (target.scrollHeight - target.clientHeight) - target.scrollTop < MIN_DIF;

        if (atBottom) onMaxScroll();
    }

    return (
        <SearchResultsStyled onScroll={checkScroll} ref={(element) => {
            scrollWindow.current = element;
            if (typeof ref === "function") {
                ref(element);
            } else if (ref) {
                ref.current = element;
            }
        }}>
            {
                songs.map((song, index) => {
                    return (
                        <div style={{ background: index % 2 === 0 ? "turquoise" : "pink" }} key={index}>
                            <SongInfoDisplay songInfo={song} onClick={onSelect} />
                        </div>
                    );
                })
            }
        </SearchResultsStyled>
    );
})

export default SearchResults;