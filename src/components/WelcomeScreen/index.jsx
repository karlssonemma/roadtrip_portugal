import React from 'react';
import styled from 'styled-components';


const Section = styled.section`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    background-color: black;

    & h1 {
        color: white;
        animation: Header 1.5s ease-in forwards;

        @keyframes Header {
            0% {
                transform: translateY(-15px);
                opacity: 0;
            }
            100% {
                transform: translateX(0);
                opacity: 100%;
            }
        }
    }

    & div {
        width: max-content;
    }

    & p {
        width: 0;
        color: white;
        border-right: 1px solid orange;
        overflow: hidden;
        white-space: nowrap;
        margin: 0 auto;
        letter-spacing: .15em;
        animation: 
            typing 2s steps(21, end) 1.5s forwards, 
            blink .75s step-end 1.5s infinite;

        @keyframes typing {
            0% { width: 0 }
            100% { width: 100% }
        };

        @keyframes blink {
            0% { border-color: transparent }
            50% { border-color: orange }
            100% { border-color: transparent }
        };
    };
`;

function WelcomeScreen() {
    return(
        <Section onClick={(e) => e.target.style.display = 'none'}>
            <h1>WELCOME</h1>
            <div>
                <p>Tap anywhere to begin</p>
            </div>
        </Section>
    );
};

export default WelcomeScreen;