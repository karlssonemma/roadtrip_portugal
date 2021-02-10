import React from 'react';
import styled from 'styled-components';

export const GridContainer = styled.main`
  margin: 0;
  display: grid;
  grid-template-columns: 90%;
  grid-template-rows: 70vh max-content max-content;
  justify-content: center;

  @media (min-width: 900px) {
    margin: 0 5%;
    grid-template-columns: 60% 30% max-content;
    grid-template-rows: 80vh;
  }

`; 