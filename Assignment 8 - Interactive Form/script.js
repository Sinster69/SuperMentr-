const form = document.getElementById("myForm");
const message = document.getElementById("message");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    // Validation
    if (name === "" || email === "" || password === "") {
        message.style.color = "red";
        message.textContent = "All fields are required!";
        return;
    }

    if (!email.includes("@")) {
        message.style.color = "red";
        message.textContent = "Enter a valid email!";
        return;
    }

    if (password.length < 6) {
        message.style.color = "red";
        message.textContent = "Password must be at least 6 characters!";
        return;
    }

    // Success
    message.style.color = "green";
    message.textContent = "Form submitted successfully!";
});