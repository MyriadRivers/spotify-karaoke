import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Word } from "../types";
import Line from "./Line";

const LyricsDisplayStyled = styled.div`
    background: salmon;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;

    .lyrics {
        background: lime;
        white-space: pre-line;
        overflow: auto;
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
        if (lyricsDisplayRef.current) {
            lyricsDisplayRef.current.scrollTop = y - lyricsDisplayRef.current.offsetTop;
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