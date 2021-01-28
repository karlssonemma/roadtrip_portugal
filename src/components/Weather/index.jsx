import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Plot from 'react-plotly.js';

const Div = styled.div`
    width: 20vw;
    height: 600px;
    background-color: gray;
`;


function Weather(props) {

    const [graph, setGraph] = useState({
        data: [
            {
                x: [],
                y: [],
                type: 'bar'
              }
        ],
        layout: {
            bargap: 0.15,
            title: 'HEAT',
            font: { family: 'Cinzel, serif' },
        },
        frames: [],
        config: {}
    });

    useEffect(() => {
        if(props.weather !== null) {

            let newGraphData = {
                x: [],
                y: [],
                type: 'bar'
            };

            props.weather.hourly.map(item => {

                newGraphData.x.push(item.dt);
                newGraphData.y.push(item.temp);

            });

            let newChartState = {
                ...graph, 
                data: [newGraphData]
            };

            setGraph(newChartState);
        };
    }, [props.weather])

    return(
        <Div>
            {
                props.weather && 
                <div>
                    <p>{props.weather.current.temp}</p>
                    <img src={props.weather.current.weather.icon} />
                </div>
            }
            {
                props.weather && <Plot
                data={graph.data}
                layout={graph.layout}
                frames={graph.frames}
                config={graph.config}
                onInitialized={(figure) => setGraph(figure)}
                onUpdate={(figure) => setGraph(figure)}
            />
            }
        </Div>
    )
}

export default Weather;