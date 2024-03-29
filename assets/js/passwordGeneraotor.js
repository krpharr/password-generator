var lower = "abcdefghijklmnopqrstuvwxyz";
var upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers = "0123456789";
var special = "`~!@#$%^&*()_+{}[];':,.?-";

var charWeightsArray = [100, 0, 0, 0];
var password = "";

var passwordText = document.getElementById("passwordTextID");
var passwordLength = document.getElementById("passwordSliderID");
var lowercaseCheck = document.getElementById("lowercaseCheckID");
var lowercaseWeight = document.getElementById("lowercaseSliderID");
var uppercaseCheck = document.getElementById("uppercaseCheckID");
var uppercaseWeight = document.getElementById("uppercaseSliderID");
var numbersCheck = document.getElementById("numbersCheckID");
var numbersWeight = document.getElementById("numbersSliderID");
var specialCheck = document.getElementById("specialCheckID");
var specialWeight = document.getElementById("specialSliderID");


function log() {
    console.log("********************");
    console.log("Password\t " + password);
    console.log("Length\t " + passwordLength.value);
    console.log("Lower\t " + lowercaseWeight.value);
    console.log("Upper\t " + uppercaseWeight.value);
    console.log("Numbers\t " + numbersWeight.value);
    console.log("Special\t " + specialWeight.value);
}

function init() {
    hideSpinIcon();
    lowercaseCheck.checked = "checked";
    lowercaseWeight.value = "100";
    passwordLength.value = "8";
    generatePassword();
    document.getElementById("generatePasswordIconID").style.display = "block";
    document.getElementById("spin_generatePasswordIconID").style.display = "none";
    deselectClipboardIcon();

}


passwordLength.oninput = function() {
    // generate a new password when password length slider is adjusted
    generatePassword();
}

function generatePassword() {
    deselectClipboardIcon();
    password = "";
    var charWeightsArray = [parseInt(lowercaseWeight.value), parseInt(uppercaseWeight.value),
        parseInt(numbersWeight.value), parseInt(specialWeight.value)
    ];

    for (var i = 0; i < passwordLength.value; i++) {
        var s = "";
        switch (chooseWithChance(charWeightsArray)) {
            case 0:
                if (charWeightsArray[0] > 0) {
                    s = lower;
                }
                break;
            case 1:
                if (charWeightsArray[1] > 0) {
                    s = upper
                }
                break;
            case 2:
                if (charWeightsArray[2] > 0) {
                    s = numbers;
                }
                break;
            case 3:
                if (charWeightsArray[3] > 0) {
                    s = special;
                }
                break;
        }

        var c = s.charAt(Math.floor(Math.random() * s.length));
        password = password.concat(c);


    }
    password = encodeURI(password);
    document.getElementById("passwordTextID").value = password;
    document.getElementById("passwordLengthID").innerHTML = passwordLength.value;

    // redraw to rid of artifacts in passwordDisplay ? works? maybe? 
    document.getElementById("app_containerID").style.display = "none";
    document.getElementById("app_containerID").style.display = "block";
}

function spinGeneratePasswordIcon() {
    document.getElementById("generatePasswordIconID").style.display = "none";
    document.getElementById("spin_generatePasswordIconID").style.display = "block";
    setTimeout(function() {
        hideSpinIcon();
        generatePassword();
    }, 800);
}

function hideSpinIcon() {
    document.getElementById("generatePasswordIconID").style.display = "block";
    document.getElementById("spin_generatePasswordIconID").style.display = "none";

}

function selectClipboardIcon() {
    document.getElementById("far_clipboardIconID").style.display = "none";
    document.getElementById("fas_clipboardIconID").style.display = "block";
}

function deselectClipboardIcon() {
    document.getElementById("far_clipboardIconID").style.display = "block";
    document.getElementById("fas_clipboardIconID").style.display = "none";
}

function numChecked() {
    var n = 0;
    if (document.getElementById("lowercaseCheckID").checked) {
        n++;
    }
    if (document.getElementById("uppercaseCheckID").checked) {
        n++;
    }
    if (document.getElementById("numbersCheckID").checked) {
        n++;
    }
    if (document.getElementById("specialCheckID").checked) {
        n++;
    }
    return n;
}


function CheckOnClick(checkID, sliderID) {
    var checkBox = document.getElementById(checkID);
    var slider = document.getElementById(sliderID);
    var oldval = slider.value;
    if (checkBox.checked === true) {
        slider.value = 100;
    } else {
        slider.value = 0;
    }
    if (numChecked() === 0) {
        checkBox.checked = true;
        slider.value = oldval;
        return;
    }
    generatePassword();
    log();
}

function SliderOnClick(sliderID, checkID) {
    var slider = document.getElementById(sliderID);
    var checkBox = document.getElementById(checkID);
    if (slider.value == 0) {
        checkBox.checked = false;
    } else {
        checkBox.checked = true;
    }
    generatePassword();
    log();
}

function copyToClipboard() {
    passwordText.select();
    passwordText.setSelectionRange(0, 99999);
    document.execCommand('copy');
    selectClipboardIcon();
}

// helper function
function totalSum(total, num) {
    return total + num;
}

function chooseWithChance(args) {
    // takes in array of percentages and returns an index 
    // based on weight of those percentages
    var argCount = args.length;
    var sumOfChances = args.reduce(totalSum);
    console.log("argCount\t " + argCount);
    console.log("sumOfChances\t " + sumOfChances);
    var r = Math.floor(Math.random() * sumOfChances);
    console.log("r\t " + r);
    console.log("minus args[argCount - 1]\t " + args[argCount - 1])
    r = r - args[argCount - 1];
    while (r > 0) {
        argCount--;
        sumOfChances = sumOfChances - args[argCount - 1];
        r = r - args[argCount - 1];
        console.log(argCount, sumOfChances, r);
    }
    console.log(argCount - 1);
    return argCount - 1;
}

// set to defaults at startup
init();