// Select the items that you can use
var buttonInput = document.querySelectorAll('.calc-button');
var operator =  document.querySelectorAll('.operator');
var outputResults = document.querySelector('#output-results');
var clear = document.querySelector('.clear');
var equalsButton = document.querySelector('.equals-button');

//create a variable to store the values and one to show it on display
var outputDisplay = '';
var storedValues = '';

for (var i = 0; i < buttonInput.length; i++) {
  buttonInput[i].onclick = function(event) {
    var buttonVal = this.value;
    storedValues += buttonVal;
    outputResults.innerHTML += buttonVal;
  }

  clear.onclick = function(event) {
    outputResults.innerHTML = '';
    storedValues = '';
  }

  equalsButton.onclick = function(event) {
    var evaluation = eval(storedValues);
    outputResults.innerHTML = evaluation;
    storedValues = evaluation;
  }
}
