import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Plot from 'react-plotly.js';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;


function WeatherGraph({ weather }) {

    const [graph, setGraph] = useState({
        data: [
            {
                x: [],
                y: [],
                mode: 'lines',
                type: 'scatter',
                line: {
                    dash: 'solid',
                    shape: 'spline',
                    width: 4,
                    smoothing: 1,
                    color: '#3366cc',
                    simplify: true
                },
                fill: 'tozeroy',
                connectgaps: true,
                visible: true,
                fillcolor: 'rgba(51, 102, 204, 0.5)'
            }
        ],
        layout: {
            bargap: 0.15,
            title: 'Daily temperature',
            font: { family: 'Jost, sans-serif' },
            margin: {
                autoexpand: true,
            },
            autosize: true,
            xaxis: {
                showgrid: false,
                autorange: true
            },
        },
        frames: [],
        config: {}
    });

    useEffect(() => {
        if(weather !== null) {

            let newGraphData = {
                x: [],
                y: [],
                mode: 'lines',
                type: 'scatter',
                line: {
                    dash: 'solid',
                    shape: 'spline',
                    width: 4,
                    smoothing: 1,
                    color: '#3366cc',
                    simplify: true
                },
                fill: 'tozeroy',
                connectgaps: true,
                visible: true,
                fillcolor: 'rgba(51, 102, 204, 0.5)'
            };

            weather.hourly.map(item => {
                let time = new Date(item.dt * 1000);
                let newTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                newGraphData.x.push(newTime);
                newGraphData.y.push(item.temp);
            });

            let newChartState = {
                ...graph, 
                data: [newGraphData]
            };

            setGraph(newChartState);
        };
    }, [weather])

    return(
        <Container>
            {
                weather && <Plot
                style={{width: '80vw', height: '70vh'}}
                data={graph.data}
                layout={graph.layout}
                frames={graph.frames}
                config={graph.config}
                onInitialized={(figure) => setGraph(figure)}
                onUpdate={(figure) => setGraph(figure)}
            />
            }
        </Container>
    )
}

export default WeatherGraph;