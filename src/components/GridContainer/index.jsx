import React from 'react';
import styled from 'styled-components';

export const GridContainer = styled.main`
margin: 0 5%;
display: grid;
grid-template-columns: 90%;
justify-content: center;

@media (min-width: 900px) {
  grid-template-columns: 60% 30% max-content;
  grid-template-rows: 600px;
}

`; 