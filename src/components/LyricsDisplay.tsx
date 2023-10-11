import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Word } from "../types";
import Line from "./Line";

const LyricsDisplayStyled = styled.div`
    /* background: salmon; */
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;

    .lyrics {
        /* background: lime; */
        white-space: pre-line;
        overflow: auto;
        display: flex;
        flex-direction: column;
        gap: 12pt;

        font-family: Arial, Helvetica, sans-serif;
        font-size: 16pt;
        font-weight: bold;

        scroll-behavior: smooth;
    }
`

const LyricsDisplay = ({lyrics, audio}: {lyrics: Array<Array<Word>>, audio: string}) => {
    const [words, setWords] = useState<Array<Array<Word>>>([]);
    const [currTime, setCurrTime] = useState<number>(0);

    const audioRef = useRef<HTMLAudioElement>(null);
    const lyricsDisplayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (audioRef.current != null) {
            audioRef.current.addEventListener("timeupdate", updateTime)
        }
    }, [])

    useEffect(() => {
        if (lyrics.length > 0) {
            // let lyrics_object = JSON.parse(lyrics);
            // setWords(lyrics_object);
            setWords(lyrics);
        }
    }, [lyrics])

    const updateTime = () => {
        if (audioRef.current != null) {
            setCurrTime(audioRef.current.currentTime);
            requestAnimationFrame(updateTime);
        }
    }

    const setTime = (ms: number) => {
        if (audioRef.current != null) {
            let seconds = ms / 1000;
            audioRef.current.currentTime = seconds;
        }
    }

    const scrollLyrics = (y: number) => {
        let activeScrollZoneTop = (window.innerHeight / 2) -  (window.innerHeight / 8);
        let activeScrollZoneBottom = (window.innerHeight / 2) +  (window.innerHeight / 8);

        if (lyricsDisplayRef.current) {
            // console.log(lyricsDisplayRef.current.scrollTop)
            console.log(y)
            let absoluteLinePosition = y - lyricsDisplayRef.current.scrollTop;

            if (absoluteLinePosition > activeScrollZoneTop && absoluteLinePosition < activeScrollZoneBottom) {
                // Need to calculate the value to add such that it pushes the current line out of the active scroll, 
                // but the next line will be in the active scroll

                // Difference between one y and the next, maybe memoize this?

                // Bug with current incremental approach: if you're far deep into the auto scroll zone, it will take many incremental jumps
                // to push the active line to outside the zone. We should calculate the scroll value to do this in one jump

                // Alternatively, just refactor this to be in the Line.tsx logic, check when a new line starts and when the line is in the active zone
                // Center it automatically
                lyricsDisplayRef.current.scrollTop = lyricsDisplayRef.current.scrollTop + 41;
            }
        }
    }

    return (
        <LyricsDisplayStyled>
            <div className="lyrics" ref={lyricsDisplayRef}>
                {words.map((line, lineIndex) => (
                    <Line key={lineIndex} words={line} setTime={setTime} currTime={currTime} scrollWindow={scrollLyrics}/>
                ))}
            </div>
            <audio controls src={audio} ref={audioRef}></audio>
        </LyricsDisplayStyled>
    )
}

export default LyricsDisplay;