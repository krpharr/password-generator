var passwordLength = document.getElementById("passwordSliderID");
var passwordDisplay = document.getElementById("passwordDisplayID");


passwordDisplay.innerHTML = passwordLength.value;


passwordLength.oninput = function() {
    passwordDisplay.innerHTML = this.value;
}