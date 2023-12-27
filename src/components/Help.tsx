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
                        NOTE: The original app back end, which would automatically generate a word-synced karaoke
                        track for most English songs on Spotify, was taken down due to resource constraints of hosting on the cloud.
                    </p>
                    <p>
                        This is a front-end demo using pregenerated data from 10 tracks before the back end was taken down. 
                    </p>
                    <p>
                        If you like the functionality of the app, you can check out my site <a href="https://jasoncgao.com/">here</a>. 
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