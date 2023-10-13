import styled from "styled-components";
import AsketNarrowEot from "../assets/fonts/AsketNarrow/AsketNarrowLight.eot"
import AsketNarrowOtf from "../assets/fonts/AsketNarrow/AsketNarrowLight.otf"
import AsketNarrowSvg from "../assets/fonts/AsketNarrow/AsketNarrowLight.svg"
import AsketNarrowTtf from "../assets/fonts/AsketNarrow/AsketNarrowLight.ttf"
import AsketNarrowWoff from "../assets/fonts/AsketNarrow/AsketNarrowLight.woff"
import AsketNarrowWoff2 from "../assets/fonts/AsketNarrow/AsketNarrowLight.woff2"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import Help from "./Help";

const StyledTitleBar = styled.div`
    @font-face {
        font-family: 'Asket Narrow';
        src: url(${AsketNarrowOtf}) format('otf'),
             url(${AsketNarrowEot}) format('embedded-opentype'),
             url(${AsketNarrowWoff}) format('woff'),
             url(${AsketNarrowWoff2}) format('woff2'),
             url(${AsketNarrowTtf}) format('truetype'),
             url(${AsketNarrowSvg}) format('svg');
    }
    /* background: plum; */
    color: #d12f4e;

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