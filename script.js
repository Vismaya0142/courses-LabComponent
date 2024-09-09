

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const dobInput = document.getElementById("dob");
    const submitBtn = document.getElementById("submitBtn");
    const modal = document.getElementById("successModal");
    const closeModal = document.getElementsByClassName("close")[0];

    
    function calculateAge(dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    
    function validateName() {
        const nameValue = nameInput.value.trim();
        const valid = /^[a-zA-Z\s]{3,}$/.test(nameValue);
        setValidationState(nameInput, valid);
        return valid;
    }

    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
        setValidationState(emailInput, valid);
        return valid;
    }

    function validatePassword() {
        const passwordValue = passwordInput.value.trim();
        const valid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(passwordValue);
        setValidationState(passwordInput, valid);
        return valid;
    }

    function validateConfirmPassword() {
        const confirmPasswordValue = confirmPasswordInput.value.trim();
        const valid = passwordInput.value.trim() === confirmPasswordValue;
        setValidationState(confirmPasswordInput, valid);
        return valid;
    }

    function validateDob() {
        const dobValue = dobInput.value;
        const age = calculateAge(dobValue);
        const valid = age >= 18;
        setValidationState(dobInput, valid);
        submitBtn.disabled = !valid;
        return valid;
    }

    
    function setValidationState(input, isValid) {
        const feedback = input.nextElementSibling;
        if (isValid) {
            input.classList.remove("invalid");
            input.classList.add("valid");
            feedback.textContent = "Valid";
            feedback.classList.add("valid");
        } else {
            input.classList.remove("valid");
            input.classList.add("invalid");
            feedback.textContent = "Invalid";
            feedback.classList.remove("valid");
        }
    }

    
    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    passwordInput.addEventListener("input", validatePassword);
    confirmPasswordInput.addEventListener("input", validateConfirmPassword);
    dobInput.addEventListener("input", validateDob);

   
    form.addEventListener("submit", (e) => {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isDobValid = validateDob();

        if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isDobValid) {
            e.preventDefault();  
        } else {
            e.preventDefault();  

            
            modal.style.display = "block";

            
            form.reset();

           
            nameInput.classList.remove("valid", "invalid");
            emailInput.classList.remove("valid", "invalid");
            passwordInput.classList.remove("valid", "invalid");
            confirmPasswordInput.classList.remove("valid", "invalid");
            dobInput.classList.remove("valid", "invalid");

           
            submitBtn.disabled = true;
        }
    });

   
    closeModal.onclick = function() {
        modal.style.display = "none";
    };

   
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});


