import { faPause, faPlay, faVolumeControlPhone, faVolumeMute, faVolumeOff, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, RefObject, forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledAudio = styled.div`
    background: none;
    color: lightgrey;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        height: 40pt;
        aspect-ratio: 1 / 1;
        border: none;
        background: none;
        color: lightgrey;
    
        :hover {
            color: white;
            cursor: pointer;
        }
    }

    audio {
        display: none;
    }
    
    .time {
        cursor: default;
    }

    .seekControls {
        display: flex;
        align-items: center;
        gap: 20px;
        height: 100%;
        width: 100%;

        .seeker {
            width: 100%;
        }

        /* background: salmon; */
    }

    .volumeControls {
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 0pt 10pt 0pt 10pt;

        width: max(10%, 150px);

        button {
            display: flex;
            align-items: center;
            padding: 0px 0px 0px 10px;
        } 
    }

    .volume {
        width: 100%;
        margin: 0pt 0pt 0pt -7.5pt;
    }
`

const StyledRange = styled.input<{$hover: boolean}>`
    -webkit-appearance: none;
    appearance: none;
    height: 8px;
    border-radius: 8px;
    background: #222222;

    &::-webkit-slider-runnable-track {
        height: 100%;
        border: none;
        border-radius: 8px;
        clip-path: inset(0px 0px 0px 0px round 16px)
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        background-color: ${props => props.$hover ? "white" : "lightgrey"};
        border: none;
        border-radius: ${props => props.$hover ? "0px" : "16px"};
        height: ${props => props.$hover ? "16px" : "8px"};
        width: ${props => props.$hover ? "16px" : "8px"};
        margin: 0px 0px 0px 0px;

        box-shadow: 0px 0px 0px 10000px ${props => props.$hover ? "#d12f4e" : "lightgrey"};
        clip-path: inset(0px 0px 0px -100vw round ${props => props.$hover ? "0px" : "16px"});
    }

    &::-moz-range-thumb {
        border: none;
        border-radius: 16px;
        height: 16px;
        width: 16px;
        opacity: ${props => props.$hover ? 1 : 0};
    }

   &::-moz-range-thumb:hover, &::-moz-range-thumb:active  {
        opacity: 1;
        width: 16px;
        height: 16px;
        background: white;
        border-radius: 16px;
    }

    &::-moz-range-progress {
        background-color: ${props => props.$hover ? "#d12f4e" : "lightgrey"};
        border: none;
        height: 100%;
        border-radius: 8px;
    }
`

interface Props {
    src: string;
}

const Audio = forwardRef<HTMLAudioElement, Props>(({src}, ref) => {
    const localRef = useRef<HTMLAudioElement | null>(null);
    const seekRef = useRef<HTMLInputElement>(null);
    const volRef = useRef<HTMLInputElement>(null);

    const [paused, setPaused] = useState<boolean>(true);
    const [muted, setMuted] = useState<boolean>(false);
    const [currTime, setCurrTime] = useState<number>(0);
    const [dur, setDur] = useState<number>(0);
    const [vol, setVol] = useState<number>(0);

    const [seekHover, setSeekHover] = useState<boolean>(false);
    const [volHover, setVolHover] = useState<boolean>(false);

    useEffect(() => {
        if (localRef.current != null) {
            localRef.current.addEventListener("timeupdate", updateTime)
            localRef.current.addEventListener("loadeddata", () => {
                if (localRef.current) {
                    setDur(localRef.current.duration)
                }
            })
        }
    }, [])

    useEffect(() => {
        if (localRef.current) {
            setDur(localRef.current.duration)
        }
    }, [localRef.current?.duration])

    // Update curent time shown to match audio's time
    const updateTime = () => {
        if (localRef.current) {
            setCurrTime(localRef.current.currentTime);
            // requestAnimationFrame(updateTime);
            if (seekRef.current) {
                if (localRef.current.currentTime !== currTime) {
                    seekRef.current.value = "" + localRef.current.currentTime;
                }
            }
        }
    }

    const play = () => {
        if (localRef && localRef.current && !isNaN(localRef.current.duration)) {
            if (paused) {
                localRef.current.play();
                setPaused(false);
            } else {
                localRef.current.pause();
                setPaused(true);
            }
        }
    }

    const mute = () => {
        if (volRef.current && localRef.current) {
            if (muted) {
                setMuted(false);
                if (vol === 0) {
                    setVol(0.5);
                    volRef.current.value = "0.5";
                    localRef.current.volume = 0.5;
                } else {
                    volRef.current.value = "" + vol;
                }
                localRef.current.muted = false;
            } else {
                setMuted(true);
                volRef.current.value = "0";
                localRef.current.muted = true;
            } 
        }
    }

    const updateAudioTime = (e: ChangeEvent<HTMLInputElement>) => {
        let val = Number(e.target.value);
        if (val !== currTime) {
            setCurrTime(val);
        }
        if (localRef.current && val !== localRef.current.currentTime) {
            localRef.current.currentTime = val;
        }
    }

    const updateVolume = (e: ChangeEvent<HTMLInputElement>) => {
        let val = Number(e.target.value);
        setVol(val);

        if (localRef.current && val !== localRef.current.volume) {
            localRef.current.volume = val;
        }

        if (localRef.current) {
            if (localRef.current.volume == 0) {
                setMuted(true);
            } else {
                setMuted(false);
            }
        }
    }

    const timestamp = (seconds: number): string => {
        if (isNaN(seconds)) {
            return "";
        }
        let min = Math.floor(seconds / 60);
        let sec = Math.round(seconds % 60);
        let time = sec < 10 ? min + ":0" + sec : min + ":" + sec;
        return time;
    }

    return (
        <StyledAudio>
            <button onClick={play} className={"play"}>{paused ? <FontAwesomeIcon icon={faPlay} size="2x"/> : <FontAwesomeIcon icon={faPause} size="2x"/>}</button>
            <div className={"seekControls"}> 
                <div className="time">{timestamp(currTime)}</div>
                <StyledRange 
                    type="range" 
                    onChange={updateAudioTime} 
                    value={0}
                    max={(localRef.current && localRef.current.duration) ? dur : 0} step={0.001} 
                    ref={seekRef} className={"seeker"} 
                    onMouseEnter={() => setSeekHover(true)}
                    onMouseLeave={() => setSeekHover(false)}
                    $hover={seekHover}
                />
                <div className="time">{localRef.current ? timestamp(dur) : ""}</div>
            </div>
            <div className={"volumeControls"}>
                <button onClick={mute} className={"mute"}>{muted ? <FontAwesomeIcon icon={faVolumeMute} size="2x"/> : <FontAwesomeIcon icon={faVolumeUp} size="2x"/>}</button>
                <StyledRange 
                    type="range" 
                    onChange={updateVolume} 
                    value={1}
                    max={1.00} 
                    step={0.01} 
                    ref={volRef} 
                    className={"volume"}
                    onMouseEnter={() => setVolHover(true)}
                    onMouseLeave={() => setVolHover(false)}
                    $hover={volHover}
                />
            </div>
            <audio controls src={src} ref={(element) => {
                localRef.current = element;
                if (typeof ref === "function") {
                    ref(element);
                } else if (ref) {
                    ref.current = element;
                }
            }}></audio>
        </StyledAudio>
    )
});

export default Audio;