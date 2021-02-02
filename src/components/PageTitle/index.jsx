import React from 'react';
import styled from 'styled-components';

const PageTitle = styled.h1`
    width: max-content;
    margin: .5em auto;
    font-family: 'Jost', sans-serif;
    font-size: 1.5rem;

        @media screen and (min-width: 500px) {
            font-size: 2.5rem;
        }
        @media screen and (min-width: 700px) {
            font-size: 3.5rem;
        }
`;

export default PageTitle;