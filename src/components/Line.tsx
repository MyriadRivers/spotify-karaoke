import styled from "styled-components";
import { Word } from "../types";
import Lyric from "./Lyric";
import { useEffect, useRef, useState } from "react";

const StyledLine = styled.div`
    /* background-color: pink; */
    display: flex;
    flex-flow: row wrap;
    gap: 0 4pt;
`

const Line = ({words, startTime, setTime, currTime, scrollWindow}: {words: Array<Word>, startTime: number, setTime: (ms: number) => void, currTime: number | undefined, scrollWindow: (y: number) => void}) => {
    const [active, setActive] = useState<boolean>(false);

    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (currTime) {
            if (currTime > startTime && !active) {
                setActive(true);

                if (lineRef.current) {
                    let rect = lineRef.current.getBoundingClientRect();
                    let lineHeight = (rect.height / 2) + rect.y;
                    // Distance from the top edge of the viewport to the middle of the line element
                    scrollWindow(lineHeight);
                }
            } else if (currTime < startTime) {
                setActive(false);
            }
        }
    }, [currTime])

    return (
        <StyledLine ref={lineRef}>
            {words.map((word, wordIndex) => (
                <Lyric key={wordIndex} word={word} setTime={setTime} currTime={currTime} scrollWindow={scrollWindow}/>
            ))}
        </StyledLine>
    )
}

export default Line;