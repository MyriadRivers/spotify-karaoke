import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html, body {
        background: black;
        height: 100%;
        padding: 0px;
        margin: 0px;
    }

    .App {
        background: #d12f4e;
        height: 100vh;
    }
`

export default GlobalStyles;