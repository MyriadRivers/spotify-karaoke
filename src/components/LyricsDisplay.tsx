import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Word } from "../types";
import Line from "./Line";
import Audio from "./Audio";
import Loading from "./Loading";

const LyricsDisplayStyled = styled.div`
    /* background: salmon; */
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .lyrics {
        white-space: pre-line;
        display: flex;
        flex-direction: column;
        gap: 12pt;

        /* font-family: Arial, Helvetica, sans-serif; */

        scroll-behavior: smooth;
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
    }
    
    .lyricsContainer {
        background: ${props => props.theme.body};
        font-size: 16pt;
        font-weight: bold;
        padding: 12pt;
        overflow: auto;
    }
`

const LyricsDisplay = ({lyrics, audio, status}: {lyrics: Array<Array<Word>>, audio: string, status: string}) => {
    const [words, setWords] = useState<Array<Array<Word>>>([]);
    const [currTime, setCurrTime] = useState<number>(0);

    const audioRef = useRef<HTMLAudioElement>(null);
    const lyricsDisplayRef = useRef<HTMLDivElement>(null);

    /**Size in percent of middle section of viewport where auto scroll is active */
    const AUTO_SCROLL_ZONE_SIZE = 1/3;

    const playHotKey = (e: KeyboardEvent) => {
        if (e.key === " " && !(e.target instanceof HTMLInputElement)) {
            e.preventDefault();
            if (audioRef.current) {
                if (audioRef.current.paused) {
                    audioRef.current.play();
                } else {
                    audioRef.current.pause();
                }
            } 
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", playHotKey);
        if (audioRef.current != null) {
            audioRef.current.addEventListener("timeupdate", updateTime)
        }
    }, [])

    useEffect(() => {
        if (lyrics.length > 0) {
            // let lyrics_object = JSON.parse(lyrics);
            // setWords(lyrics_object);
            setWords(lyrics);
            if (lyricsDisplayRef.current) {
                lyricsDisplayRef.current.scrollTop = 0;
            }
        }
    }, [lyrics])

    const updateTime = () => {
        if (audioRef.current) {
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
        let autoScrollZoneTop = (window.innerHeight / 2) -  (window.innerHeight * (AUTO_SCROLL_ZONE_SIZE / 2));
        let autoScrollZoneBottom = (window.innerHeight / 2) +  (window.innerHeight * (AUTO_SCROLL_ZONE_SIZE / 2));

        if (lyricsDisplayRef.current) {
            let lyricsRect = lyricsDisplayRef.current.getBoundingClientRect();
            let relY = y - lyricsRect.y;
            // lyric container top to top of visible content + top of visible content to line = distance from container top to line
            // - half of container's height because scrollTop sets the top of visible content, we want our content to be in the middle of the container not top 
            let scrollHeight = lyricsDisplayRef.current.scrollTop + relY - (lyricsRect.height / 2);

            if (relY > autoScrollZoneTop && relY < autoScrollZoneBottom) {
                lyricsDisplayRef.current.scrollTop = scrollHeight;
            }
        }
    }

    return (
        <LyricsDisplayStyled>
            <div className="lyricsContainer" ref={lyricsDisplayRef}>
                {(() => {
                    switch (status) {
                        case "loading":
                            return <Loading />
                        case "error":
                            return <div>Looks like we can't find the lyrics for this one.</div>
                        default:
                            return (
                                <div className={"lyrics"}>
                                {words.map((line, lineIndex) => (
                                    <Line key={lineIndex} words={line} startTime={line[0].startTime / 1000} setTime={setTime} currTime={currTime} scrollWindow={scrollLyrics}/>
                                ))}
                                {words.length === 0 && <div>Search for a song to see lyrics.</div>}
                                </div>
                            )
                    }
                })()}
                
            </div>
            <Audio src={audio} ref={audioRef}/>
        </LyricsDisplayStyled>
    )
}

export default LyricsDisplay;