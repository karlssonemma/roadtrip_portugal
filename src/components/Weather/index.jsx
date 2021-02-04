import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Plot from 'react-plotly.js';

const Div = styled.div`
    max-width: 600px;
    width: 80vw;
    height: 90vh;
`;


function Weather(props) {

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
            xaxis: {
                showgrid: false,
                autorange: true
            },
        },
        frames: [],
        config: {}
    });

    useEffect(() => {
        if(props.weather !== null) {

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

            props.weather.hourly.map(item => {
                let time = item.dt * 1000;
                let newTime = new Date(time);
                let newTime2 = newTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                console.log(newTime2)

                newGraphData.x.push(newTime2);
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
                props.weather && <Plot
                style={{width: 'auto', height: '300px'}}
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