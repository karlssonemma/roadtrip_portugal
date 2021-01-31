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
        font-family: 'Quattrocento', serif;
        font-size: 16px;
        color: black;
        background-color: white;
        letter-spacing: 1.5;
    }

    main {
        margin: 0 8vw;
    }
`;

export default GlobalStyle;