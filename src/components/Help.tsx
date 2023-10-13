import { faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyledHelp = styled.div`
    font-size: 18pt;

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

    .container {
        /* background: slategray; */
        color: lightgrey;
        
        width: ${window.innerWidth < window.innerHeight ? "100vw" : "calc(75vw - 50px)"};
        height: 100%;
        z-index: 3000;

        display: flex;
        align-items: start;
        justify-content: space-between;

        margin: auto;
        padding: 30px 30px 30px 30px;

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
                    The backend uses the WhisperX speech-to-text transcription model to align the times of every word in the lyrics.
                    Deezer's Spleeter source separation model was used to remove the vocals from the music.
                    <br />
                    <br />
                    The app isn't perfect. Sometimes WhisperX will drop some audio, which will desync the lyrics. 
                    Also, right now the app only supports English songs. Hopefully you can still get some fun out of it.
                    <br />
                    <br />
                    If you like the app, you can check out my site <a href="https://myriadrivers.github.io/">here</a>, 
                    and if you find any bugs, let me know at jasongao678@gmail.com.
                    <br />
                    <br />
                    —Jason
                </div>
                <button onClick={hideHelp}><FontAwesomeIcon icon={faXmark} size={"2x"}/></button>
            </div>
        </StyledHelp>
    )
}

export default Help;