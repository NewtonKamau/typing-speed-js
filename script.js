/*jshint esversion: 6 */

const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0, 0, 0, 0];
var interval;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}
// Run a standard minute/second/hundredths timer:
function runTimer() {
  let currentTime = leadingZero(timer[0]) + ":" + leadingZero( timer[1]) + ":" +leadingZero( timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;

  //get seconds, minutes and hours respectively
  timer[0] = Math.floor((timer[3] / 100) / 60);
    timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60);
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;

    let originTextMatch = originText.substring(0, textEntered);
    //checks if the entered text is same as the original text
    if (textEntered == originText) {
        //stops the timer once the condition is true
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";

    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65ccf3";

        } else {
            testWrapper.style.borderColor = "#E95D0F";
        }
    }
}

// Start the timer:
function start() {
  let textEnteredLength = testArea.value.length;
  if (textEnteredLength === 0) {
   interval =  setInterval(runTimer, 10);
  }
  console.log(textEnteredLength);
}

// Reset everything:
function reset() {
  console.log("the reset button has been clicked ");
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
