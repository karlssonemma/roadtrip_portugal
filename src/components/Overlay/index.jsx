import React from 'react';
import styled from 'styled-components';

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgba(0,0,0, 0.8);
  z-index: 10;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;