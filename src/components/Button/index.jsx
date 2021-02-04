import React from 'react';
import styled from 'styled-components';
import CloseIcon from './img/cancel.png';

const Btn = styled.button`
    border: none;
    margin: 1em;
    cursor: pointer;
    background-color: transparent;

    & img {
        width: 25px;
        filter: invert(1);

    } &:hover {
        transform: scale(1.1);
    };
`;

function Button(props) {
    return(
        <Btn onClick={() => props.function()}><img src={CloseIcon} /></Btn>
    )
}

export default Button;