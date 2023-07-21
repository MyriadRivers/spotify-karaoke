import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html, body {
        background: orange;
        height: 100%;
        padding: 0px;
        margin: 0px;
    }

    .App {
        background: green;
        height: 100vh;
    }
`

export default GlobalStyles;