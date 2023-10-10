import styled from "styled-components";
import { Word } from "../types";
import { useEffect, useRef, useState } from "react";

const StyledLyric = styled.div<{ word: Word, currTime: number | undefined, percent: number}>`
    background-color: #86cecb;
    display: grid;

    &:hover {
        cursor: pointer;
    }
    
    .back {
        color: #d12f4e;
        clip-path: inset(0 ${props => 100 - props.percent}% 0 0);
        /* transition: clip-path 0.1s ease; */
        grid-row: 1;
        grid-column-start: 1;
    }

    .front {
        color: white;
        grid-row: 1;
        grid-column-start: 1;
    }
`

const Lyric = ({word, setTime, currTime, scrollWindow}: {word: Word, setTime: (ms: number) => void, currTime: number | undefined, scrollWindow: (y: number) => void}) => {
    const [percent, setPercent] = useState<number>(0);
    const [scrolled, setScrolled] = useState<boolean>(false);

    const lyricRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (currTime) {
            let perc = getPercent(currTime);
            setPercent(perc)
            if (percent > 0 && percent !== 100 && !scrolled) {
                setScrolled(true);
                if (lyricRef.current) {
                    let lineHeight = lyricRef.current.offsetTop;
                    scrollWindow(lineHeight)
                }
            } else if (percent == 0) {
                setScrolled(false);
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
            <div className="back" ref={lyricRef}>{word.word}</div>
            <div className="front">{word.word}</div>
        </StyledLyric>
    )
}

export default Lyric;