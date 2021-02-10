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

    & div {
        width: max-content;
    }
`;

const Intro = styled.p`
    width: 60%;
    color: gray;

    text-align: center;
    font-family: 'Jost', sans-serif;
    font-size: 1.2rem;

    animation: Header 1.5s ease-in forwards;

    @media screen and (min-width: 800px) {
        width: 40%;
        font-size: 1.6rem;
    }

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
`;

const AnimatedText = styled.p`
    width: 0;
    color: white;
    border-right: 1px solid transparent;
    overflow: hidden;
    white-space: nowrap;
    margin: 0 auto;
    letter-spacing: .15em;
    animation: 
        typing 2s steps(21, end) 2s forwards, 
        blink .75s step-end 2s infinite;

    @keyframes typing {
        0% { width: 0 }
        100% { width: 100% }
    };

    @keyframes blink {
        0% { border-color: orange }
        50% { border-color: transparent }
        100% { border-color: orange }
    };
`;


function WelcomeScreen({ pageData }) {

    setTimeout(() => {
        hideWelcomeScreen()
    }, 9000);

    function hideWelcomeScreen() {
        let screen = document.querySelector('.welcome-screen')
        screen.style.display = 'none';
    };

    return(
        <Section className='welcome-screen' onClick={() => hideWelcomeScreen()}>
            {
              pageData && <Intro dangerouslySetInnerHTML={{__html: pageData.content}} />
            }
            <div>
              <AnimatedText>Tap anywhere to begin</AnimatedText>
            </div>
        </Section>
    );
};

export default WelcomeScreen;