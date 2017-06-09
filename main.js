// Selecting needed variables
var buttonInput = document.querySelectorAll('.calc-button');
var outputResults = document.querySelector('#output-results');
var clear = document.querySelector('.clear');
var equalsButton = document.querySelector('.equals-button');
var squareRootButton = document.querySelector('.square-root');
var buttonVal;

// Creating a variable to store the values and one to show it on display
var outputDisplay = '';
var storedValues = '';

// Creating a variable for operating value so you can't add an operator first
//as well as one for number value so you can swap out operators
var operatorValue = false;
var numValue = false;
var equalsRan = false;

for (var i = 0; i < buttonInput.length; i++) {
  // Creates button value variable and onClick event
  buttonInput[i].onclick = function(event) {
    // If statement looking for numbers versus operators
    if (this.classList.contains('num')) {
      // If statement checking if equals was the last thing done
      // If yes, then clicking a number clears the display and stored values
      if (equalsRan) {
        resetValues()
        equalsRan = false;
      }
      // Adds the value of the number to the variable button value, then
      // Adds that value to both a stored variable and the html for viewing
      buttonVal = this.value;
      assignButtonValue();
      // Set operator value to true so you can now enter an operator
      operatorValue = true;
      numValue = true;
    } else {
      // Check to see if there is either no initial entry and no operator beforehand
      if (operatorValue) {
        // When operatorValue is true, allows you to put an operator
        // Then sets the variable to false for not allowing double operators
        buttonVal = this.value;
        assignButtonValue();
        operatorValue = false;
        equalsRan = false;
      } else if (operatorValue === false && numValue) {
        // Allows switching of operators if wrong operator initially selected
        buttonVal = this.value;
        storedValues = storedValues.slice(0, -1) + this.value;
        outputResults.innerHTML = outputResults.innerHTML.slice(0, -1) + this.value;
      } else if (operatorValue === false && this.value == "-" && storedValues == "") {
        // Allows for a single minus if nothing else is entered for negative numbers
        buttonVal = this.value;
        assignButtonValue();
        numValue = false;
      }
    }
  }

  // Function to clear the screen and stored variable
  // Also sets operator value to false to not input one at start
  clear.onclick = function(event) {
    resetValues()
    operatorValue = false;
  }

  // Button to square root the input and put it in display
  // Only square roots the first number before the operator
  // Delay added to show user what is being calculated
  squareRootButton.onclick = function(event) {
    if (storedValues == '' || storedValues == "-") {
      //do nothing
    } else {
      var squareRootResult = Math.sqrt(parseInt(storedValues));
      outputResults.innerHTML = "√" + parseInt(storedValues);
      setTimeout(function() {outputResults.innerHTML = squareRootResult;
      storedValues = squareRootResult;}, 1000)
    }
  }

  // Equals button to evaluate the string and set the stored values correctly
  // Because calculator can only input numbers and a handful of symbols, using
  // Eval() command to evaluate the content inside the string. Also handles complex
  // Calculations with no issues
  equalsButton.onclick = function(event) {
    if (operatorValue == false) {
      // Getting rid of last character if it is an operator
      storedValues = storedValues.slice(0, -1);
    }
    var evaluation = eval(storedValues);
    if (evaluation == undefined) {
      resetValues()
    } else {
      outputResults.innerHTML = evaluation;
      storedValues = evaluation;
    }
    equalsRan = true;
  }

  //Functions for assigning buttons and resetting values
  function assignButtonValue() {
    storedValues += buttonVal;
    outputResults.innerHTML += buttonVal;
  }

  function resetValues() {
    outputResults.innerHTML = "";
    storedValues = "";
  }
}
