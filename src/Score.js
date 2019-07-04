import React from "react";

const Score = props => {
  return (
    <div>
      <h4 className="score">Score {props.currentScore}</h4>
    </div>
  );
};

export default Score;
