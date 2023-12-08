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
            color: ${props => props.theme.accent};
            text-decoration: none;
        }
    }
`

const Help = ({hideHelp}: {hideHelp: () => void}) => {
    return (
        <StyledHelp>
            <div className={"container"}>
                <div className={"text"}>
                    <p>
                        This app was built with React.js.
                    </p>
                    <p>
                        The backend uses the WhisperX speech-to-text transcription model to align the times of the lyrics.
                        Deezer's Spleeter source separation model was used to remove the vocals from the music.
                    </p>
                    <p>
                        Here are known issues with the app:
                        <ul>
                            <li>The model can sometimes drop segments of audio, causing a couple of lines to get out of sync. They should resync after a while.</li>
                            <li>The app doesn't work with non-English songs.</li>
                            <li>The lyrics API doesn't have some songs that have lyrics on Spotify.</li>
                        </ul>
                    </p>
                    <p>
                        If you find any other bugs, let me know at jasongao678+dev (at) gmail.com, 
                        and if you like the app, you can check out my site <a href="https://myriadrivers.github.io/">here</a>, 
                    </p>
                    <p>
                        —Jason
                    </p>
                </div>
                <button onClick={hideHelp}><FontAwesomeIcon icon={faXmark} size={"2x"}/></button>
            </div>
        </StyledHelp>
    )
}

export default Help;