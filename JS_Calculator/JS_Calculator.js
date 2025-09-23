class Calculator {
  constructor() {
    this.entryWindow = document.querySelector(".current_num");
    this.entries = [];
    this.operationWindow = document.querySelector(".calculation");

    this.btnsDiv = document.querySelector("#buttons");
    // this.resultBtn = document.querySelector(".result_button");
    this.init();
  }

  handleDigitClicks(event) {
    let numKey = event.target;

    if (event.target.classList.contains("digit")) {
      if (
        this.entries.length === 1 &&
        this.entries[0] === "0" &&
        numKey.innerText !== "0"
      ) {
        this.entries[0] = numKey.innerText;
        this.entryWindow.textContent = this.entries[0];
      } else {
        this.entries.push(numKey.innerText);
        let value = this.entries.join("");

        this.entryWindow.textContent = value;
      }
    }

    if (event.target.classList.contains("dot")) {
      if (this.entries.includes(".")) {
        return;
      } else {
        this.entries.push(numKey.innerText);
        let value = this.entries.join("");

        this.entryWindow.textContent = value;
      }
    }
  }

  handleOperatorClicks(event) {
    let opKey = event.target;

    if (event.target.classList.contains("op")) {
      let currentNum = this.entryWindow.textContent;

      this.operationWindow.textContent +=
        currentNum + " " + opKey.innerText + " ";
      this.entries = [];
      this.entryWindow.textContent = "0";
    }
  }

  handleControlClicks(event) {
    if (event.target.id === "ce") {
      this.entryWindow.textContent = "0";
    } else if (event.target.id === "c") {
      this.entries = [];
      this.entryWindow.textContent = "0";
      this.operationWindow.textContent = "";
    } else if (event.target.id === "neg") {
      const currentEntry = this.entries.join("");

      if (currentEntry.startsWith("-")) {
        this.entries = currentEntry.slice(1).split("");
      } else {
        this.entries = ["-"].concat(this.entries);
      }

      this.entryWindow.textContent = this.entries.join("");
    }
  }

  handleResultClick(event) {
    let fullInput =
      this.operationWindow.textContent + this.entryWindow.textContent;

    let parsedInput = this._parseInput(fullInput);
    let result = this._calculateResult(parsedInput);

    this.operationWindow.textContent = "";
    this.entryWindow.textContent = String(result);
    this.entries = [String(result)];
  }

  //Mama bear handler
  handleButtonClick(event) {
    const target = event.target;

    if (
      target.classList.contains("digit") ||
      target.classList.contains("dot")
    ) {
      this.handleDigitClicks(event);
    } else if (target.classList.contains("op")) {
      this.handleOperatorClicks(event);
    } else if (target.classList.contains("control")) {
      this.handleControlClicks(event);
    } else if (target.classList.contains("result_button")) {
      this.handleResultClick(event);
    }
  }

  //helpers
  _parseInput(input) {
    if (!input) return [];

    const tokens = input.match(/-?\d+(\.\d+)?|[\+\-\x\/%]/g);
    if (!tokens) return [];

    return tokens.map((token) => {
      if (!isNaN(token)) {
        return parseFloat(token);
      } else {
        return token;
      }
    });
  }

  _calculateResult(parsedInputs) {
    let expression = [...parsedInputs];

    // Handles x, /, %
    for (let i = 0; i < expression.length; i++) {
      const operator = expression[i];
      if (operator === "x" || operator === "/" || operator === "%") {
        const prevNumber = expression[i - 1];
        const nextNumber = expression[i + 1];
        let result;

        if (operator === "x") {
          result = prevNumber * nextNumber;
        } else if (operator === "/") {
          if (nextNumber === 0) {
            throw new Error("Division by zero is not allowed.");
          }
          result = prevNumber / nextNumber;
        } else if (operator === "%") {
          if (nextNumber === 0) {
            throw new Error("Modulo by zero is not allowed.");
          }
          result = prevNumber % nextNumber;
        }

        // replace the 3 elements with the single result
        expression.splice(i - 1, 3, result);
        // adjust index for new position.
        i = i - 2;
      }
    }

    // Handles +, -
    for (let i = 0; i < expression.length; i++) {
      const operator = expression[i];
      if (operator === "+" || operator === "-") {
        const prevNumber = expression[i - 1];
        const nextNumber = expression[i + 1];
        let result;

        if (operator === "+") {
          result = prevNumber + nextNumber;
        } else {
          result = prevNumber - nextNumber;
        }

        expression.splice(i - 1, 3, result);
        i = i - 2;
      }
    }

    return expression[0];
  }

  bindEvents() {
    this.btnsDiv.addEventListener("click", this.handleButtonClick.bind(this));
  }

  init() {
    this.bindEvents();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Calculator();
});
