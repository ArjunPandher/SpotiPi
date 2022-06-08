import React from 'react';
import * as d3 from 'd3';
import { useD3 } from '../hooks/useD3';
import { InternSet } from 'd3';

function PiChart(genres) {

    const dimensions = {
        width: 600,
        height: 600,
        margin: {top: 0, bottom: 0, right: 0, left: 0},
      };
    
    let data = genres.genres;

    const ref = useD3(
        (svg) => {
            const width = dimensions.width;
            const height = dimensions.height;
            const svgWidth = width + dimensions.margin.left + dimensions.margin.right;
            const svgHeight = height + dimensions.margin.top + dimensions.margin.bottom;

            const innerRadius = 0;
            const outerRadius = Math.min(width, height) / 2;
            const labelRadius = outerRadius * 0.8 + innerRadius * 0.2;

            const names = d3.map(data, (d) => { return d.name });
            const counts = d3.map(data, (d) => { return d.count });
            const percentages = d3.map(data, (d) => { return d.percentage });
            const interval = d3.range(names.length);

            const namesSet = new InternSet(names);

            let colors = undefined;

            if (colors === undefined) colors = d3.schemeSpectral[namesSet.size];
            if (colors === undefined) colors = d3.quantize(t => d3.interpolateSpectral(t*0.8 + 0.1), namesSet.size);
            
            const color = d3.scaleOrdinal(namesSet, colors);

            const title = i => `${names[i]}\n${percentages[i]}`;

            const arcs = d3.pie().padAngle(0).sort(null).value(i => counts[i])(interval);
            const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
            const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

            svg
              .attr("width", svgWidth)
              .attr("height", svgHeight)
              .attr("viewBox", [-svgWidth / 2, -svgHeight / 2, svgWidth, svgHeight])
              .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

            svg
              .append("g")
                .attr("stroke", innerRadius > 0 ? "none" : "white")
                .attr("stroke-width", 1)
                .attr("stroke-linejoin", "round")
              .selectAll("path")
              .data(arcs)
              .join("path")
                .attr("fill", d => color(names[d.data]))
                .attr("d", arc)
              .append("title")
                .text(d => title(d.data));

            svg
              .append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .attr("text-anchor", "middle")
              .selectAll("text")
              .data(arcs)
              .join("text")
                .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
              .selectAll("tspan")
              .data(d => {
                const lines = `${title(d.data)}`.split(/\n/);
                return (d.endAngle - d.startAngle) > 0.25 ? lines : lines.slice(0, 1);
              })
              .join("tspan")
                .attr("x", 0)
                .attr("y", (_, i) => `${i * 1.1}em`)
                .attr("font-weight", (_, i) => i ? null : "bold")
                .text(d => d);

            // const radius = Math.min(width, height) / 2;
            // const color = d3.scaleOrdinal(d3.schemeCategory10);
            
            // svg.append('svg')
            //     .attr('width', svgWidth)
            //     .attr('height', svgHeight)
            //     .append('g')
            //     .attr('transform', `translate(${width/2}, ${height/2})`);
            
            // let arc = d3.arc()
            //     .innerRadius(0)
            //     .outerRadius(radius);
            
            // let pie = d3.pie()
            //     .value((d) => { return d.count; })
            //     .sort(null);

            // let tooltip = d3.select('#chart')
            //     .append('div')
            //     .attr('class', 'tooltip')
        },
        [ data ]
    )

    return (
        <svg 
        ref={ref}>

        </svg>
    )

    // return (
    //     <div>hullo</div>
    // )
}

export default PiChart;