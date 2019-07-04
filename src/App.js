import React, { Component } from "react";
import GameBoard from "./GameBoard";

class App extends Component {
  render() {
    return (
      <div>
        <GameBoard width="300" height="300" />
      </div>
    );
  }
}

export default App;
