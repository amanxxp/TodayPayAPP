import React from "react";

const Keys = ({handleButton}) => {
  const basicKeys = [
    "(",
    ")",
    "mc",
    "m+",
    "m-",
    "mr",
    "C",
    "+/-",
    "%",
    "÷",
    "2nd",
    "x2",
    "x3",
    "xy",
    "ex",
    "10x",
    "7",
    "8",
    "9",
    "X",
    "1/x",
    "2√x",
    "3√x",
    "y√x",
    "ln",
    "log10",
    "4",
    "5",
    "6",
    "-",
    "x!",
    "sin",
    "cos",
    "tan",
    "e",
    "EE",
    "1",
    "2",
    "3",
    "+",
    "Rad",
    "sinh",
    "cosh",
    "tanh",
    "π",
    "Rand",
    "0",
    ".",
    "=",
  ];
  function getButtonColor(item){
    if (parseInt(item, 10) >= 1 && parseInt(item, 10) <= 9 && !["2nd", "1/x", "2√x", "3√x"].includes(item)) {
        return "number";
    }
    if(item==="0"){
        return "number large"
    }
    if (item === ".") {
        return "number";
      }
    if (["X", "÷", "+", "-","="].includes(item)) {
        return "math";
    }
  }
  return (
    <div>
      <div className="keys">
        {basicKeys.map((item, index) => (
          <button
            key={index}
            onClick={() => handleButton(item)}
            className={`${getButtonColor(item)} `}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Keys;
