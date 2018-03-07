import React from 'react';

function Cell(props) {
  if (props.highlight) {
    return (
      <button
        className="cell"
        onClick={props.onClick}
        style={{color: 'red'}}
      >
        {props.value}
      </button>
      );
  } else {
    return (
      <button
        className="cell"
        onClick={props.onClick}
      >
        {props.value}
      </button>
      );
  }
}

export default Cell;
