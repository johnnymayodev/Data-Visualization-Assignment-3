import React, { Component } from "react";

import * as d3 from "d3";

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    var data = this.props.data;

    // set the dimensions and margins of the graph
    var margin = { top: 50, right: 50, bottom: 60, left: 20 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var container = d3
      .select(".child1")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_1")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add Labels
    container
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - h / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Tip");

    container
      .append("text")
      .attr("y", h + margin.top - 20)
      .attr("x", w / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Total Bill");

    // title
    container
      .append("text")
      .attr("x", w / 2)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text("Total Bill vs.Average Tip");

    // Add X axis
    var x_data = data.map((item) => item.total_bill);
    const x_scale = d3
      .scaleLinear()
      .domain([0, d3.max(x_data)])
      .range([margin.left, w]);

    container.selectAll(".x_axis_g").data([0]).join("g").attr("class", "x_axis_g").attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));

    // Add Y axis
    var y_data = data.map((item) => item.tip);
    const y_scale = d3
      .scaleLinear()
      .domain([0, d3.max(y_data)])
      .range([h, 0]);

    container.selectAll(".y_axis_g").data([0]).join("g").attr("class", "y_axis_g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y_scale));

    // Add dots
    container
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => x_scale(d.total_bill))
      .attr("cy", (d) => y_scale(d.tip))
      .attr("r", 3)
      .style("fill", "#69b3a2");
  }

  render() {
    return (
      <svg className="child1">
        <g className="g_1"></g>
      </svg>
    );
  }
}

export default Child1;
