import { faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyledHelp = styled.div`
    font-size: 18pt;
    line-height: 24pt;

    position: fixed;
    top: 0px;
    left: 0px;
    
    background: #222222;
    /* opacity: 0; */

    width: 100%;
    height: 100%;
    z-index: 2000;

    display: flex;
    /* align-items: center; */
    /* justify-content: center; */
    overflow: auto;

    .container {
        /* background: slategray; */
        color: lightgrey;
        
        width: ${window.innerWidth < window.innerHeight ? "100vw" : "calc(75vw - 50px)"};
        height: calc(100% - 60px);
        z-index: 3000;

        display: flex;
        align-items: start;
        justify-content: space-between;

        margin: auto;

        padding: 30px 30px 30px 30px;

        .text {
            
        }

        button {
            color: lightgrey;

            :hover {
                color: white;
            }
        }

        a {
            color: #d12f4e;
            text-decoration: none;
        }
    }
`

const Help = ({hideHelp}: {hideHelp: () => void}) => {
    return (
        <StyledHelp>
            <div className={"container"}>
                <div className={"text"}>
                    This app was built with React.js.
                    <br/>
                    <br/>
                    The backend uses the WhisperX speech-to-text transcription model to align the times of the lyrics.
                    Deezer's Spleeter source separation model was used to remove the vocals from the music.
                    <br />
                    <br />
                    Sometimes WhisperX will drop some audio and desync the lyrics, 
                    and the times can sometimes get off causing some phrases to display ahead of time. Also, only English lyrics
                    work well right now.
                    <br />
                    <br />
                    If you find any other bugs, let me know at jasongao678+dev (at) gmail.com, 
                    and if you like the app, you can check out my site <a href="https://myriadrivers.github.io/">here</a>, 
                    <br />
                    <br />
                    —Jason
                    <br />
                    <br />
                </div>
                <button onClick={hideHelp}><FontAwesomeIcon icon={faXmark} size={"2x"}/></button>
            </div>
        </StyledHelp>
    )
}

export default Help;