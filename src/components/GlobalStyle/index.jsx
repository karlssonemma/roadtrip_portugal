import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html, body {
        margin: 0;
        padding: 0;
    }

    body {
        font-family: sans-serif;
        font-size: 16px;
        color: black;
        background-color: white;
        letter-spacing: 1.5;
    }
`;

export default GlobalStyle;