// Select the items that you can use
var buttonInput = document.querySelectorAll('.calc-button');
var operator =  document.querySelectorAll('.operator');
var outputResults = document.querySelector('#output-results');
var clear = document.querySelector('.clear');
var equalsButton = document.querySelector('.equals-button');
var squareRootButton = document.querySelector('.square-root');
var buttonVal;
var equalsRan = false;

//creating a variable to store the values and one to show it on display
var outputDisplay = '';
var storedValues = '';

//creating a variable for operating value so you can't add an operator first
//as well as one for number value so you can swap out operators
var operatorValue = false;
var numValue = false;

for (var i = 0; i < buttonInput.length; i++) {
  //creates button value variable and onClick event
  buttonInput[i].onclick = function(event) {
    //if statement looking for numbers versus operators
    if (this.classList.contains('num')) {
      //adds the value of the number to the variable button value, then
      //adds that value to both a stored variable and the html for viewing
      buttonVal = this.value;
      storedValues += buttonVal;
      outputResults.innerHTML += buttonVal;
      //set operator value to true so you can now enter an operator
      operatorValue = true;
      numValue = true;
    } else {
      //check to see if there is either no initial entry and no operator beforehand
      if (operatorValue) {
        //when operatorValue is true, allows you to put an operator
        //then sets the variable to false for not allowing double operators
        buttonVal = this.value;
        storedValues += buttonVal;
        outputResults.innerHTML += buttonVal;
        operatorValue = false;
      } else if (operatorValue === false && numValue) {
        buttonVal = this.value;
        storedValues = storedValues.slice(0, -1) + this.value;
        outputResults.innerHTML = outputResults.innerHTML.slice(0, -1) + this.value;
      }
    }
  }

  //function to clear the screen and stored variable
  //also sets operator value to false to not input one at start
  clear.onclick = function(event) {
    outputResults.innerHTML = '';
    storedValues = '';
    operatorValue = false;
  }

  //button to square root the input and put it in display
  //Only square roots the first number before the operator
  squareRootButton.onclick = function(event) {
    if (storedValues == '') {
      //do nothing
    } else {
      var squareRootResult = Math.sqrt(parseInt(storedValues));
      outputResults.innerHTML = "√" + parseInt(storedValues);
      setTimeout(function() {outputResults.innerHTML = squareRootResult;
      storedValues = squareRootResult;}, 1000)
    }
  }

  //equals button to evaluate the string and set the stored values correctly
  //because calculator can only input numbers and a handful of symbols, using
  //eval() command to evaluate the content inside the string
  equalsButton.onclick = function(event) {
    var evaluation = eval(storedValues);
    if (evaluation == undefined) {
      outputResults.innerHTML = "";
      storedValues = "";
    } else {
      outputResults.innerHTML = evaluation;
      storedValues = evaluation;
    }
    equalsRan = true;
  }
}
