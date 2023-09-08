let print = [];

document.getElementById("signup-form").addEventListener("submit", function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    let error = false;

    let passwordDiv = document.getElementById("password-div");
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm_password").value;
    
    if (password != confirmPassword) {
        let errorMessage = document.querySelector(".error-message");
        if (errorMessage) {
            passwordDiv.removeChild(errorMessage);
        }

        let errorElement = document.createElement("div");
        errorElement.classList.add("error-message");
        errorElement.textContent = "Passwords do not match";
        passwordDiv.appendChild(errorElement);
        error = true;
    }

    // Redirect the user back to your webpage
    if (!error) {
        window.location.href = "";
    }
});