import React from 'react';
import { select } from 'd3';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { line } from 'd3-shape';

import { BaseData } from "../../data/types";
import './graph.css';

interface PriceVisualizerProps {
    priceData: BaseData;
    plotSize: { width: number, height: number };
}

const PriceVisualizer: React.FC<PriceVisualizerProps> = function(props): JSX.Element {
    const { priceData } = props;
    const { plotSize } = props;

    // React and D3.js both operate over the DOM, which creates conflicts.
    // As such, the "canvas" should be modified using a handle (ref).
    const canvasHandle = React.useRef<SVGSVGElement>();

    // Draw some simple data onto the graph.
    // "canvas" does not exist until AFTER the component is rendered!
    // As such, painting to the canvas needs to be registered as a side-effect.
    React.useEffect(function() {
        if (priceData) {
            const canvas = canvasHandle.current;

            // Apply new data to the chart
            const axisX = scaleLinear()
                .domain([ 0, priceData.length ])
                .range([ 0, plotSize.width ]);

            const axisY = scaleLinear()
                .domain(extent(priceData))
                .range([ plotSize.height, 0 ]);

            const priceParser = function*(data: BaseData): Iterable<[number, number]> {
                for (const priceEntry of data.entries()) {
                    yield priceEntry;
                }
            };

            const path = line()
                .x(d => axisX(d[0]))
                .y(d => axisY(d[1]));

            select(canvas)
                .append("path")
                .datum(priceData)
                .attr("fill", "none")
                .attr("stroke", "#FF0000")
                .attr("stroke-width", 1.5)
                .attr("d", path(
                    priceParser(priceData)
                ));
        }
    }, [ canvasHandle, priceData ]);


    return (
        <svg className={"ui-graph"} ref={canvasHandle} width={plotSize.width} height={plotSize.height}></svg>
    );
};

export {
    PriceVisualizer
};