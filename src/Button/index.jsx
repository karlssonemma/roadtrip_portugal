import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
    width: max-content;
    height: max-content;
    padding: .5em 1em;
    margin: .5em;
    border-radius: 5px;
    background-color:white;
    border: 1px solid lightgray;
    cursor: pointer;
`;

function Button(props) {
    return(
        <Btn onClick={() => props.function()}>{props.text}</Btn>
    )
}

export default Button;