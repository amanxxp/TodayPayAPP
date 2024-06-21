import React, { memo, useState } from "react";
import Display from "./Display";
import Keys from "./Keys";
import ConfettiExplosion from "react-confetti-explosion";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [displayEXP, setDisplayEXP] = useState("");
  const [result, setResult] = useState("0");
  const [isExploding, setIsExploding] = useState(false);
  const handleButtonClick = () => {
    setIsExploding(true);
    setTimeout(() => setIsExploding(false), 3000);
  };
  

    const checkExpression = (expression) => {
      const operationPattern = /(\d+)\s*([\+\-\*\/])\s*(\d+)/g;
      let match;
      while ((match = operationPattern.exec(expression)) !== null) {
          const num1 = parseInt(match[1]);
          const num2 = parseInt(match[3]);
          if (Math.abs(num1 - num2) === 1) {
            console.log("checked")
            handleButtonClick();
              return ; 
          }
      }
      return ;
    };
  function calcResult() {
    if (expression.length !== 0) {
      try {
        let compute = eval(expression);
        compute = parseFloat(compute.toFixed(4));
        setResult(compute);
        checkExpression(expression);
      } catch (error) {
        setResult("An Error Occurred!");
      }
    } else {
      setResult("An Error Occurred!");
    }
  }
  const sciFunc = {
    sin: "Math.sin",
    cos: "Math.cos",
    tan: "Math.tan",
    ln: "Math.log",
    log10: "Math.log10",
    π: "Math.PI",
    e: "Math.E",
    xy: "**",
    "2√": "Math.sqrt",
    "3√": "Math.cbrt",
    sinh: "Math.sinh",  
    cosh: "Math.cosh",
    tanh: "Math.tanh",
  };
  const [memory,setMemory] = useState(null);
  function handleButton(value) {
    if (value === "C") {
      setExpression("");
      setDisplayEXP("");
      setResult("0");
    } else if (sciFunc.hasOwnProperty(value)) {
      setDisplayEXP(displayEXP + value);
      setExpression(expression + sciFunc[value]);
    } else if(value === "x2" || value ==="x3" || value === "10x"){
      if(value === "x2"){
        let expres = parseInt(displayEXP);
        console.log(expres);
        setDisplayEXP(displayEXP + value);
        setExpression(`Math.pow(${expres},2)`)
      }
      else if(value === "x3"){
        let expres = parseInt(displayEXP);
        console.log(expres);
        setDisplayEXP(displayEXP + value);
        setExpression(`Math.pow(${expres},3)`)
      }
      else if(value === "10x"){
        let expres = parseInt(displayEXP);
        console.log(expres);
        setDisplayEXP(displayEXP + value);
        setExpression(`Math.pow(10,${expres})`)
      }
    }
    else if (value === "m+" || value === "m-" || value === "mr" || value === "mc") {
      if (value === "m+") {
        const currentDisplay = eval(expression);
        setMemory((prevMemory) => {
          if (prevMemory === null) {
            return parseFloat(currentDisplay);
          } else {
            return prevMemory + parseFloat(currentDisplay);
          }
        });
      } else if (value === "m-") {
        const currentDisplay = eval(expression);
        setMemory((prevMemory) => {
          if (prevMemory !== null) {
            return prevMemory - parseFloat(currentDisplay);
          }
          return prevMemory;
        });
      } else if (value === "mr") {
        if (memory !== null) {
          setDisplayEXP(memory.toString());
          setExpression(memory.toString());
        } else {
          setDisplayEXP("0");
          setExpression("0");
        }
      } else if (value === "mc") {
        setMemory(null);
      }
    }
    else if (value === "X" || value === "÷") {
      const lastNum = extractLastNum(expression);
      if (lastNum != null) {
        const num = parseFloat(lastNum);
        setDisplayEXP(displayEXP + value);
        if (value === "X") {
          setExpression(expression + "*");
        }
        if (value === "÷") {
          setExpression(expression + "/");
        }
      }
    } else if (value === "x!") {
      const lastNum = extractLastNum(expression);
      if (lastNum != null) {
        const num = parseFloat(lastNum);
        setDisplayEXP(displayEXP + "!");
        setExpression(expression.replace(lastNum, factorial(num)));
      }
    } else if (value === "=") calcResult();
    else {
      setExpression(expression + value);
      setDisplayEXP(displayEXP + value);
    }
  }
  function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) result *= i;
    return result;
  }
  function extractLastNum(exp) {
    const numbers = exp.match(/\d+/g);
    return numbers ? numbers[numbers.length - 1] : null;
  }
  return (
    <div className="calculator">
      {isExploding && (
        <ConfettiExplosion
          className="explosion"
          force={0.8}
          duration={3000}
          particleCount={650}
          width={1600}
        />
      )}  
      <Display expression={displayEXP} result={result} />
      <Keys handleButton={handleButton} />
    </div>
  );
};

export default Calculator;
