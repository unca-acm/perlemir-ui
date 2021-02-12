import React from 'react';
import { select } from 'd3';

import './graph.css';

// TODO: modify this type once we know the data shape
type PriceData = Uint32Array | number[];

interface PriceVisualizerProps {
    priceData: PriceData;
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
        const canvas = canvasHandle.current;
        const barWidth = Math.floor(plotSize.width / priceData.length);

        // Apply new data to the chart
        select(canvas)
            .selectAll('rect')
            .data(priceData)
            .enter()
            .append('rect')
            .attr('x', (d, i) => (barWidth * i))
            .attr('y', d => plotSize.height - d)
            .attr('width', barWidth)
            .attr('height', d => d);
    }, [ canvasHandle, priceData ]);


    return (
        <svg className={"ui-graph"} ref={canvasHandle} width={plotSize.width} height={plotSize.height}></svg>
    );
};

export {
    PriceVisualizer
};