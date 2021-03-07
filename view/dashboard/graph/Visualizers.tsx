import React from 'react';
import { select } from 'd3';
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent } from 'd3-array';
import { line } from 'd3-shape';
import { axisBottom, axisRight } from 'd3-axis';
import { Button } from "@chakra-ui/react";

import { BaseData, DataBlock } from "../../data/types";
import './graph.css';

interface PriceVisualizerProps {
    priceData: DataBlock;
    plotSize: { width: number, height: number };
}

const PriceVisualizer: React.FC<PriceVisualizerProps> = function(props): JSX.Element {
    const { priceData } = props;
    const { plotSize } = props;
    const [price, setPrice] = React.useState<number>(0.0);

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
            // Initiate path with data
            const pricePath = graph.selectAll("path")
                .data([ priceData.data ])
                // Styling attached to path is derived from CSS rather than being added manually
                .enter()
                .append("path")
                .attr("class", "ui-graph-path")
                .attr("d", path(priceParser(priceData.data)));

            // Define data/domain for axes
            const axisX = axisBottom(timeScale);
            const axisY = axisRight(scaleY);
            // Attach axes to graph
            const graphAxes = graph.selectAll("g");
            graphAxes
                .data([ priceData.data ])
                .enter()
                .append("g")
                .attr("class", "ui-graph-axis")
                .call(axisX);
            graphAxes
                .data([ priceData.domain ])
                .enter()
                .append("g")
                .attr("class", "ui-graph-axis")
                .call(axisY);
            
            // If the user's mouse is currently pointing into the graph, illustrate the point.
            const point = canvas.createSVGPoint();
            const handleMouseOver = function(data) {
                // Copy the mouse point over to our "universal" point, temporarily.
                point.x = data.x;
                point.y = data.y;

                // Calculate the mouse position; however, the "y" position is not final.
                // The "y" position needs to follow the graph, so we calculate it afterward.
                // Matrix transform is done first so that we have proper portions.
                const mousePosition = point.matrixTransform(canvas.getScreenCTM().inverse());

                // Calculate the "true" y-coordinate, which is the price value at x.
                // Use the relative x-position as the index.
                const priceIndex = scaleX.invert(mousePosition.x).toFixed(0);
                // Sets to 0.0 if undefined (i.e. priceIndex is out of bounds).
                const dataValue = priceData.data[priceIndex] || 0.0;
                mousePosition.y = scaleY(dataValue);

                // Draw the new circle at the calculated mouse position.
                // Old circles are removed; this prevents having a "trail" of circles.
                graph.selectAll("circle").remove();
                graph.append("circle")
                    .attr("cx", mousePosition.x)
                    .attr("cy", mousePosition.y)
                    .attr("r", 4);
                setPrice(dataValue);
            }

            // Remove any remaining circles after the mouse leaves.
            const handleMouseOut = function() {
                graph.selectAll("circle").remove();
                setPrice(0.0);
            }

            // Attach handlers based on mouse events.
            graph.on("mousemove", handleMouseOver);
            graph.on("mouseleave", handleMouseOut);

            // Function which cleans up D3 points on unmount
            return function() {
                pricePath.exit().remove();
            };
        }
    }, [ canvasHandle, priceData, price ]);

    return (
        <div className="ui-graph-container">
            <svg className="ui-graph" ref={canvasHandle} width={plotSize.width} height={plotSize.height}></svg>
            <br></br>
            <div className="ui-graph-controls">
                <p className="ui-text">Price: ${price.toFixed(2)}</p>
                <Button className="ui-button" size="md">Pump it!</Button>
            </div>
        </div>
    );
};

export {
    PriceVisualizer
};