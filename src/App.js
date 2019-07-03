import React, { Component } from "react";
import GameBoard from "./GameBoard";
import ScoreBoard from "./ScoreBoard";

class App extends Component {
  render() {
    return (
      <div>
        <ScoreBoard />
        <GameBoard width="300" height="300" />
      </div>
    );
  }
}

export default App;
