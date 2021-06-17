import React from "react";

const HistoryItem = (props) => {
  return (
    <li>
      <div class="item">
        <span>On {props.Date}</span>
        <h3>Amount transferred: &#8377; {props.amount}</h3>
        <p>
          {props.From} transferred &#8377;{props.amount} to {props.To} on{" "}
          {props.Date}
        </p>
      </div>
    </li>
  );
};

export default HistoryItem;
