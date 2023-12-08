import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import Help from "./Help";
import "../styles/fonts.css";

const StyledTitleBar = styled.div`
    /* background: plum; */
    color: ${props => props.theme.accent};

    font-family: "Asket Narrow";
    font-size: 28pt;
    font-weight: bold;
    

    display: flex;
    align-items: start;
    justify-content: space-between;

    padding: 10px 0px 0px 0px;

    cursor: default;

    button {
        background: none;
        color: #222222;

        border: none;

        &:hover {
            color: #444444;
            cursor: pointer;
        }
    }
`

const TitleBar = ({text}: {text: string}) => {
    const [help, showHelp]= useState<boolean>(false);
    return (
        <StyledTitleBar>
            {text}
            <button onClick={() => showHelp(true)}><FontAwesomeIcon icon={faQuestionCircle} size={"2x"}/></button>
            {help && <Help hideHelp={() => showHelp(false)}/>}
        </StyledTitleBar>
    )
}

export default TitleBar;