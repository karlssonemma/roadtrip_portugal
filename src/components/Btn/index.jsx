import React from 'react';
import styled from 'styled-components';
import CloseIcon from './img/cancel.png';

const Button = styled.button`
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

function Btn(props) {
    return(
        <Button onClick={() => props.function()}><img src={CloseIcon} /></Button>
    )
}

export default Btn;