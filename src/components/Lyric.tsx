import styled from "styled-components";
import { Word } from "../types";
import { useEffect, useState } from "react";

const StyledLyric = styled.div<{ word: Word, currTime: number | undefined, percent: number}>`
    /* background-color: #86cecb; */
    display: grid;
    
    &:hover {
        cursor: pointer;
    }
    
    .back {
        color: lightgrey;
        clip-path: inset(0 ${props => 100 - props.percent}% 0 0);
        transition: clip-path 0.1s ease;
        grid-row: 1;
        grid-column-start: 1;
        
        &:hover {
            color: white;
        }
    }

    .front {
        color: black;
        clip-path: inset(0 0 0 ${props => props.percent}%);
        transition: clip-path 0.1s ease;
        grid-row: 1;
        grid-column-start: 1;

        &:hover {
            color: white;
        }
    }
`

const Lyric = ({word, setTime, currTime, scrollWindow}: {word: Word, setTime: (ms: number) => void, currTime: number | undefined, scrollWindow: (y: number) => void}) => {
    const [percent, setPercent] = useState<number>(0);

    useEffect(() => {
        if (currTime) {
            let perc = getPercent(currTime);
            // The print statement changes the rendering cycle somehow to make the state get updated smoothly
            // Taking this out makes the animation look choppy
            // TODO: figure out what the hell is going on
            console.log("");
            if (perc !== percent) {
                setPercent(perc)
            }
        }
    }, [currTime])

    /**
     * Returns an integer 0 - 100 representing what percent of the current lyric word has been sung.
     * @param seconds Seconds into the song
     * @returns Integer percent into the current lyric word corresponding to the current time in the song, between 0% and 100%.
     */
    const getPercent = (seconds: number) => {
        let currTimeMs = seconds * 1000;
        return Math.round(Math.max(Math.min((currTimeMs - word.startTime) / (word.endTime - word.startTime), 1), 0) * 100);
    }

    return (
        <StyledLyric word={word} currTime={currTime} percent={percent} onClick={() => setTime(word.startTime)}>
            <div className="back" >{word.word}</div>
            <div className="front">{word.word}</div>
        </StyledLyric>
    )
}

export default Lyric;