import React, { Component } from "react";

import * as d3 from "d3";

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    var data = this.props.data;

    // set the dimensions and margins of the graph
    var margin = { top: 50, right: 10, bottom: 50, left: 25 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var container = d3
      .select(".child2")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_2")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);


    // Add Labels
    container
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - h / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Average Tip");

    container
      .append("text")
      .attr("y", h + margin.top - 30)
      .attr("x", w / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Day");

    // title
    container
      .append("text")
      .attr("x", w / 2)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text("Average Tip by Day");

    // Add X axis (Saturday, Sunday, Thursday, and Friday)
    const x_data = data.map((item) => item.day);
    const x_scale = d3
      .scaleBand()
      .domain([...new Set(x_data)])
      .range([margin.left, w]);

    container.selectAll(".x_axis_g").data([0]).join("g").attr("class", "x_axis_g").attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));

    // Add Y axis (Average tip for that day)
    const y_data = [...new Set(x_data)].map((day) => d3.mean(data.filter((item) => item.day === day).map((item) => item.tip)));
    const y_scale = d3
      .scaleLinear()
      .domain([0, d3.max(y_data)])
      .range([h, 0]);

    container.selectAll(".y_axis_g").data([0]).join("g").attr("class", "y_axis_g").attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(y_scale));

    // Add bars
    const gap = 30;
    container
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x_scale(d.day) + gap / 2)
      .attr("y", (d) => y_scale(d3.mean(data.filter((item) => item.day === d.day).map((item) => item.tip))))
      .attr("width", x_scale.bandwidth() - gap)
      .attr("height", (d) => h - y_scale(d3.mean(data.filter((item) => item.day === d.day).map((item) => item.tip))))
      .style("fill", "#69b3a2");
  }

  render() {
    return (
      <svg className="child2">
        <g className="g_2"></g>
      </svg>
    );
  }
}

export default Child2;
