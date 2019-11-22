var lower = "abcdefghijklmnopqrstuvwxyz";
var upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers = "0123456789";
var special = "`~!@#$%^&*()_+-{}[];':,.?";

var charWeightsArray = [100, 0, 0, 0];
var password = "";

var passwordDisplay = document.getElementById("passwordDisplayID");
var passwordLength = document.getElementById("passwordSliderID");
var lowercaseCheck = document.getElementById("lowercaseCheckID");
var lowercaseWeight = document.getElementById("lowercaseSliderID");
var uppercaseCheck = document.getElementById("uppercaseCheckID");
var uppercaseWeight = document.getElementById("uppercaseSliderID");
var numbersCheck = document.getElementById("numbersCheckID");
var numbersWeight = document.getElementById("numbersSliderID");
var specialCheck = document.getElementById("specialCheckID");
var specialWeight = document.getElementById("specialSliderID");

var passwordDisplayHeight = document.getElementById("password_display_ID").offsetHeight;
var passwordDisplayWidth = document.getElementById("password_display_ID").offsetWidth;



function log() {
    console.log("********************");
    console.log("Password\t " + password);
    console.log("Length\t " + passwordLength.value);
    console.log("Lower\t " + lowercaseWeight.value);
    console.log("Upper\t " + uppercaseWeight.value);
    console.log("Numbers\t " + numbersWeight.value);
    console.log("Special\t " + specialWeight.value);
    console.log("passwordDisplay height: " + passwordDisplayHeight);
    console.log("passwordDisplay width: " + passwordDisplayWidth);
}

function init() {
    lowercaseCheck.checked = "checked";
    lowercaseWeight.value = "100";
    passwordLength.value = "8";
    generatePassword();
    document.getElementById("generatePasswordIconID").style.display = "block";
    document.getElementById("spin_generatePasswordIconID").style.display = "none";
    deselectClipboardIcon();

}

passwordLength.oninput = function() {
    generatePassword();
}

function generatePassword() {
    // spinGeneratePasswordIcon();
    deselectClipboardIcon();
    password = "";
    var charWeightsArray = [parseInt(lowercaseWeight.value), parseInt(uppercaseWeight.value),
        parseInt(numbersWeight.value), parseInt(specialWeight.value)
    ];
    console.log(charWeightsArray);

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

        console.log(s);

        var c = s.charAt(Math.floor(Math.random() * s.length));
        console.log("Random Char: " + c);
        password = password.concat(c);

    }
    // passwordDisplay.innerHTML = password;
    console.log(password);
    document.getElementById("passwordTextID").value = password;
    document.getElementById("passwordDisplayID").innerHTML = password;
    document.getElementById("passwordLengthID").innerHTML = passwordLength.value;


    //reset background to invisible 
    passwordDisplay.style.backgroundColor = "rgb(127, 246, 255, 0.0)";

    log();


    var s;
    // if (passwordLength.value < 128) {
    //     s = "2rem";
    // }
    // if (passwordLength.value < 120) {
    //     s = "3rem";
    // }
    if (passwordLength.value < 128) {
        s = "32px";
    }
    if (passwordLength.value < 69) {
        s = "48px";
    }
    if (passwordLength.value < 17) {
        s = "96px";
    }

    passwordDisplay.style.fontSize = s;

    // redraw to rid of artifacts in passwordDisplay
    document.getElementById("app_containerID").style.display = "none";
    document.getElementById("app_containerID").style.display = "block";

}

function spinGeneratePasswordIcon() {

    document.getElementById("generatePasswordIconID").style.display = "none";

    document.getElementById("spin_generatePasswordIconID").style.display = "block";

    setTimeout(function() {
        document.getElementById("generatePasswordIconID").style.display = "block";
        document.getElementById("spin_generatePasswordIconID").style.display = "none";
        generatePassword();
    }, 800);

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

function passwordDisplayOnClick() {
    passwordDisplay.style.backgroundColor = "rgb(127, 246, 255, 0.0)";

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
    var copyText = document.getElementById("passwordTextID");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    // alert("Copied the text: " + copyText.value);
    passwordDisplay.style.backgroundColor = "rgb(127, 246, 255, 0.5)"
    selectClipboardIcon();
}

function totalSum(total, num) {
    return total + num;
}

function chooseWithChance(args) {
    // takes in array of percentages and returns an index 
    // based on weight of those percentages

    var argCount = args.length;
    var sumOfChances = args.reduce(totalSum);

    // for (var i = 0; i < argCount; i++) {
    //     sumOfChances = sumOfChances + args[i];
    // }

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

init();