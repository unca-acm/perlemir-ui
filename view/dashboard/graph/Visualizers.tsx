import React from 'react';
import { select } from 'd3';
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent } from 'd3-array';
import { line } from 'd3-shape';
import { axisBottom, axisRight } from 'd3-axis';

import { BaseData, DataBlock } from "../../data/types";
import './graph.css';

interface PriceVisualizerProps {
    priceData: DataBlock;
    plotSize: { width: number, height: number };
}

const PriceVisualizer: React.FC<PriceVisualizerProps> = function(props): JSX.Element {
    const { priceData } = props;
    const { plotSize } = props;

    // React and D3.js both operate over the DOM, which creates conflicts.
    // As such, the "canvas" should be modified using a handle (ref).
    const canvasHandle = React.useRef<SVGSVGElement>();

    // Draw some simple data onto the Graph.
    // "canvas" does not exist until AFTER the component is rendered!
    // As such, painting to the canvas needs to be registered as a side-effect.
    React.useEffect(function() {
        if (priceData) {
            const canvas = canvasHandle.current;

            // Calculate the "padding" for the axes
            const padding = {
                x: 50,
                y: 50,
            };

            // Apply new data to the chart
            const scaleX = scaleLinear()
                .domain([ 0, priceData.data.length ])
                .range([ padding.x, plotSize.width ]);

            const scaleY = scaleLinear()
                .domain(extent(priceData.data))
                .range([ plotSize.height, padding.y ]);

            const timeScale = scaleTime()
                .domain(extent(priceData.domain))
                .range([ padding.x, plotSize.width ]);

            const priceParser = function*(data: BaseData): Iterable<[number, number]> {
                for (const priceEntry of data.entries()) {
                    yield priceEntry;
                }
            };

            const path = line()
                .x(d => scaleX(d[0]))
                .y(d => scaleY(d[1]));

            const graph = select(canvas);
            // Paint Graph onto the canvas
            graph
                .append("path")
                .datum(priceData)
                .attr("class", "ui-graph-path")
                .attr("d", path(
                    priceParser(priceData.data)
                ));

            // Add axis grids
            const axisX = axisBottom(timeScale);
            const axisY = axisRight(scaleY);
            graph.append("g")
                .call(axisX);
            graph.append("g")
                .call(axisY);
        }
    }, [ canvasHandle, priceData ]);

    return (
        <svg className={"ui-graph"} ref={canvasHandle} width={plotSize.width} height={plotSize.height}></svg>
    );
};

export {
    PriceVisualizer
};