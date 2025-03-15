document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("feedback-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const suggestionsInput = document.getElementById("suggestions");
    const charCount = document.getElementById("char-count");
    const toggleButton = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "light";
    const formErrors = [];
    
    // Function to update charCount color based on theme
    function updateCharCountColor() {
        const theme = document.documentElement.getAttribute("data-theme");
        charCount.style.color = theme === "dark" ? "white" : "black";
    }

    // Input Masking for Name
    nameInput.addEventListener("input", () => {
        const restrict = /^[A-Za-z\s]*$/;
        if (!restrict.test(nameInput.value)) {
            nameInput.classList.add("error");
            document.getElementById("name-error").textContent = "Only letters and spaces allowed.";
            formErrors.push({ field: "name", message: "Invalid characters used" });
        } else {
            nameInput.classList.remove("error");
            document.getElementById("name-error").textContent = "";
        }
    });

    emailInput.addEventListener("input", () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            emailInput.classList.add("error");
            document.getElementById("email-error").textContent = "Invalid email format.";
            formErrors.push({ field: "email", message: "Invalid email format" });
        } else {
            emailInput.classList.remove("error");
            document.getElementById("email-error").textContent = "";
        }
    });

    // Apply saved theme
    document.documentElement.setAttribute("data-theme", currentTheme);
    toggleButton.textContent = currentTheme === "dark" ? "🌙" : "🌞";
    updateCharCountColor(); // Apply charCount color based on theme

    // Toggle theme on click
    toggleButton.addEventListener("click", () => {
        const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        toggleButton.textContent = newTheme === "dark" ? "🌙" : "🌞";
        updateCharCountColor();
    });

    // Character Countdown for Comments
    suggestionsInput.addEventListener("input", () => {
        const remaining = 500 - suggestionsInput.value.length;
        charCount.textContent = `${remaining} characters remaining`;

        if (remaining <= 50) {
            charCount.style.color = "orange";
        }

        if (remaining <= 10) {
            charCount.style.color = "red";
        }

        if (remaining > 50) {
            updateCharCountColor(); // Reset color based on theme if >50 characters
        }
    });

    // Form Submission
    form.addEventListener("submit", () => {
        if (formErrors.length > 0) {
            document.getElementById("form-errors").value = JSON.stringify(formErrors);
        }
    });
});
