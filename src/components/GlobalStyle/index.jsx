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
        height: 100vh;
        font-family: 'Bodoni Moda', serif;
        font-size: 16px;
        color: black;
        background-color: white;
        letter-spacing: 1.5;
        font-weight: 400;
    }

    main {
        margin: 0 5%;
    }
`;

export default GlobalStyle;