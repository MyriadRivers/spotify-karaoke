import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    html {
        height: 100%;
    }

    body {
        background: black;
        height: 100%;
        padding: 0px;
        margin: 0px;
        font-family: Arial, Helvetica, sans-serif;
    }

    #root {
        height: 100%;
    }

    .App {
        height: 100%;
    }
`

export default GlobalStyles;