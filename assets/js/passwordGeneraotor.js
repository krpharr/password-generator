var passwordLength = document.getElementById("passwordSliderID");
var lowercaseCheck = document.getElementById("lowercaseCheckID");
var lowercaseWeight = document.getElementById("lowercaseSliderID");
var uppercaseWeight = document.getElementById("uppercaseSliderID");
var numbersWeight = document.getElementById("numbersSliderID");
var specialWeight = document.getElementById("specialSliderID");

var passwordDisplay = document.getElementById("passwordDisplayID");


passwordDisplay.innerHTML = passwordLength.value;


passwordLength.oninput = function() {
    passwordDisplay.innerHTML = this.value;
}

var password = "";
var charWeightsArray = [0, 0, 0, 0];

function CheckOnClick(checkID, sliderID) {
    var checkBox = document.getElementById(checkID);
    var slider = document.getElementById(sliderID);
    if (checkBox.checked === true) {
        slider.value = 100;
    } else {
        slider.value = 0;
    }
}

function SliderOnClick(sliderID, checkID) {
    var slider = document.getElementById(sliderID);
    var checkBox = document.getElementById(checkID);
    if (slider.value == 0) {
        checkBox.checked = false;
    } else {
        checkBox.checked = true;
    }
}

function chooseWithChance(args) {
    // takes in array of percentages and returns an index 
    // based on weight of those percentages

    var argCount = args.length;
    var sumOfChances = 0;
    for (var i = 0; i < argCount; i++) {
        sumOfChances += args[i];
    }
    var r = Math.floor(Math.random() * sumOfChances);
    r = r - args[argCount - 1];
    while (r > 0) {
        argCount--;
        sumOfChances = sumOfChances - args[argCount - 1];
        r = r - args[argCount - 1];
    }
    return argCount - 1;
}