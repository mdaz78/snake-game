import React from "react";

const Score = props => {
  console.log(props);
  return (
    <div>
      <h4>Score {props.currentScore}</h4>
    </div>
  );
};

export default Score;
