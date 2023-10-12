import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html, body {
        background: black;
        height: 100%;
        padding: 0px;
        margin: 0px;
        font-family: Arial, Helvetica, sans-serif;
    }

    .App {
        background: #111111;
        height: 100vh;
    }
`

export default GlobalStyles;