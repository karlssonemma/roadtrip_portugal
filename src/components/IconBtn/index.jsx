import React from 'react';
import styled from 'styled-components';
import CloseIcon from './img/cancel.png';

const IconButton = styled.button`
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

function IconBtn({ btnFunction }) {
    return(
        <IconButton onClick={() => btnFunction()}><img src={CloseIcon} /></IconButton>
    )
}

export default IconBtn;