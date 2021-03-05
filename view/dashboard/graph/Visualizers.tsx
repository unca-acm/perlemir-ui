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
    const [price, setPrice] = React.useState("");

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
            const mouseOver = () => {
                console.log("DiPWuZhErE");
            }
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
            
            // If the user's mouse is currently pointing into the graph, illustrate the point.
            const point = canvas.createSVGPoint();
            const handleMouseOver = function(data) {
                point.x = data.x;
                point.y = scaleX.invert(point.x);
                // price = data.y;

                // Calculate the mouse position; however, the "y" position is not final.
                // The "y" position needs to follow the graph, so we calculate it afterward.
                // Matrix transform is done first so that we have proper portions.
                const mousePosition = point.matrixTransform(canvas.getScreenCTM().inverse());

                // Calculate the "true" y-coordinate, which is the price value at x.
                const dataValue = priceData.data[mousePosition.y.toFixed(0)];
                // Scale it to match the size of the canvas.
                mousePosition.y = scaleY(dataValue);

                // Old circles are removed; this prevents having a "trail" of circles.
                graph.selectAll("circle").remove();
                const formatPrice = dataValue.toFixed(2)
                // Draw the new circle at the calculated mouse position.
                graph.append("circle")
                    .attr("cx", mousePosition.x)
                    .attr("cy", mousePosition.y)
                    .attr("r", 4);
                setPrice(`$${formatPrice}`);
            }

            // Remove any remaining circles after the mouse leaves.
            const handleMouseOut = function() {
                graph.selectAll("circle").remove();
            }

            // Attach handlers based on mouse events.
            graph.on("mousemove", handleMouseOver);
            graph.on("mouseleave", handleMouseOut);
            
        }
    }, [ canvasHandle, priceData, price ]);

    return (
        <div>
        
        <svg className={"ui-graph"} ref={canvasHandle} width={plotSize.width} height={plotSize.height}></svg>
        <h1>{price}</h1>
        </div>
    );
};

export {
    PriceVisualizer
};