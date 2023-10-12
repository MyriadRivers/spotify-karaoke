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

const StyledRange = styled.input<{$percent: number, $hover: boolean}>`
    -webkit-appearance: none;
    appearance: none;
    height: 8px;
    border-radius: 8px;
    background: #222222;

    &::-webkit-slider-runnable-track {
        background: linear-gradient(to right, ${props => props.$hover ? "#d12f4e" : "lightgrey"} 0%, ${props => props.$hover ? "#d12f4e" : "lightgrey"} ${props => props.$percent * 100}%, #222222 ${props => props.$percent * 100}%, #222222 100%);
        height: 100%;
        border: none;
        border-radius: 8px;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        background-color: white;
        border: none;
        border-radius: 16px;
        height: 16px;
        width: 16px;
        opacity: ${props => props.$hover ? 1 : 0};
        margin: -4px 0 0 0px;
    }

    &::-moz-range-thumb {
        border: none;
        border-radius: 16px;
        height: 16px;
        width: 16px;
        opacity: ${props => props.$hover ? 1 : 0};
    }

    &::-webkit-slider-thumb:hover, &::-webkit-slider-thumb:active  {
        -webkit-appearance: none;
        appearance: none;
        opacity: 1;
        width: 16px;
        height: 16px;
        background-color: white;
        border-radius: 16px;
        margin: -4px 0 0 0px;
    }

   &::-moz-range-thumb:hover, &::-moz-range-thumb:active  {
        opacity: 1;
        width: 16px;
        height: 16px;
        background: white;
        border-radius: 16px;
    }

    &::-moz-range-progress {
        background-color: ${props => props.$hover ? "#d12g4e" : "lightgrey"};
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

    // Update position slider to match audio time as it plays
    useEffect(() => {
        if (localRef.current && seekRef.current) {
            if (localRef.current.currentTime !== currTime) {
                seekRef.current.value = "" + localRef.current.currentTime;
            }
        }
    }, [localRef.current?.currentTime])

    // Update duration shown to match audio's duration
    useEffect(() => {
        if (localRef.current) {
            setDur(localRef.current.duration);
        }
    }, [localRef.current?.duration])

    // Update curent time shown to match audio's time
    useEffect(() => {
        if (localRef.current) {
            setCurrTime(localRef.current.currentTime);
        }
    }, [localRef.current?.currentTime])

    const play = () => {
        if (localRef && localRef.current) {
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
                    max={dur} step={0.001} 
                    ref={seekRef} className={"seeker"} 
                    onMouseEnter={() => setSeekHover(true)}
                    onMouseLeave={() => setSeekHover(false)}
                    $percent={currTime / dur}
                    $hover={seekHover}
                />
                <div className="time">{isNaN(dur) ? "0:00" : timestamp(dur)}</div>
            </div>
            <div className={"volumeControls"}>
                <button onClick={mute} className={"mute"}>{muted ? <FontAwesomeIcon icon={faVolumeMute} size="2x"/> : <FontAwesomeIcon icon={faVolumeUp} size="2x"/>}</button>
                <StyledRange 
                    type="range" 
                    onChange={updateVolume} 
                    max={1.00} 
                    step={0.01} 
                    ref={volRef} 
                    className={"volume"}
                    onMouseEnter={() => setVolHover(true)}
                    onMouseLeave={() => setVolHover(false)}
                    $percent={localRef.current ? localRef.current.volume : 1}
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