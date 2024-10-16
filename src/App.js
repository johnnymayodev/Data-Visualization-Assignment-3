// react
import React, { Component } from "react";

// packages
import * as d3 from "d3";

// data
import tips from "./data/tips.csv";

// components
import Child1 from "./components/Child1";
import Child2 from "./components/Child2";

// other
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    d3.csv(tips, function (data) {
      return {
        tip: parseFloat(data.tip),
        total_bill: parseFloat(data.total_bill),
        day: data.day,
      };
    })
      .then((data) => {
        this.setState({ data });
      })

      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Child1 data={this.state.data} />
          <Child2 data={this.state.data} />
        </div>
      </div>
    );
  }
}

export default App;
