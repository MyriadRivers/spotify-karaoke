import styled from "styled-components";
import { Word } from "../types";
import Lyric from "./Lyric";

const StyledLine = styled.div`
    /* background-color: pink; */
    display: flex;
    flex-flow: row wrap;
    gap: 0 4pt;
`

const Line = ({words, setTime, currTime, scrollWindow}: {words: Array<Word>, setTime: (ms: number) => void, currTime: number | undefined, scrollWindow: (y: number) => void}) => {

    return (
        <StyledLine>
            {words.map((word, wordIndex) => (
                <Lyric key={wordIndex} word={word} setTime={setTime} currTime={currTime} scrollWindow={scrollWindow}/>
            ))}
        </StyledLine>
    )
}

export default Line;