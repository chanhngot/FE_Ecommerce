// Function to validate email address
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Function to save data to local storage
function save_data() {
    var input = document.getElementById("emailInput");
    var email = input.value.trim();

    if (validateEmail(email)) {
        // Save email to local storage
        localStorage.setItem("email", email);
        // Display success message
        document.getElementById('error').textContent = "Subcrisbe successfully!";
        document.getElementById('error').style.color = "green";
        return true; // Allow form submission
    } else {
        // Display error message
        document.getElementById('error').textContent = "Please enter a valid email address.";
        document.getElementById('error').style.color = "red";
        return false; // Prevent form submission
    }
}

// Add event listener to form submission
document.getElementById('subscribe').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    save_data(); // Call save_data function for validation and saving data
});


document.addEventListener("DOMContentLoaded", function() {
    // Chọn radio button "Direct Bank Transfer" khi trang được tải
    document.querySelector('input[name="Direct Bank Transfer"][value="Direct Bank Transfer"]').checked = true;
    });
    function placeOrder() {
    var formData = {};
    var formElements = document.getElementById("billing").elements;
    for (var i = 0; i < formElements.length; i++) {
        if (formElements[i].type !== "button") {
            formData[formElements[i].name] = formElements[i].value;
        }
    }
    var dataOutput = document.getElementById('data');
    dataOutput.innerHTML = "<pre>" + JSON.stringify(formData, null, 2) + "</pre>";

    }

    function validateForm() {
        var firstName = document.getElementById('first-name');
        var lastName = document.getElementById('last-name');
        var phoneNumber = document.getElementById('phone-number');
        var emailAddress = document.getElementById('email-address');
        var address = document.getElementById('address');
    
        var firstNameError = document.getElementById('first-name-error');
        var lastNameError = document.getElementById('last-name-error');
        var phoneNumberError = document.getElementById('phone-number-error');
        var emailAddressError = document.getElementById('email-address-error');
        var addressError = document.getElementById('address-error');
    
        var isValid = true;
    
        if (firstName.value.trim() === '') {
            firstNameError.textContent = "First Name is required";
            isValid = false;
        } else {
            firstNameError.textContent = "";
        }
    
        if (lastName.value.trim() === '') {
            lastNameError.textContent = "Last Name is required";
            isValid = false;
        } else {
            lastNameError.textContent = "";
        }
    
        if (phoneNumber.value.trim() === '') {
            phoneNumberError.textContent = "Phone Number is required";
            isValid = false;
        } else if (!isValidPhoneNumber(phoneNumber.value.trim())) {
            phoneNumberError.textContent = "Invalid Phone Number";
            isValid = false;
        } else {
            phoneNumberError.textContent = "";
        }
    
        if (emailAddress.value.trim() === '') {
            emailAddressError.textContent = "Email Address is required";
            isValid = false;
        } else if (!isValidEmail(emailAddress.value.trim())) {
            emailAddressError.textContent = "Invalid Email Address";
            isValid = false;
        } else {
            emailAddressError.textContent = "";
        }
    
        if (address.value.trim() === '') {
            addressError.textContent = "Street Address is required";
            isValid = false;
        } else {
            addressError.textContent = "";
        }
    
        if (isValid) {
            // Save data to local storage
            var invoiceData = {
                "First Name": firstName.value.trim(),
                "Last Name": lastName.value.trim(),
                "Phone Number": phoneNumber.value.trim(),
                "Email Address": emailAddress.value.trim(),
                "Address": address.value.trim()
            };
    
            localStorage.setItem("invoiceData", JSON.stringify(invoiceData));
        }
    
        return isValid;
    }
    

    function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    }

    function isValidPhoneNumber(phoneNumber) {
    var phoneRegex = /^\d{10,11}$/;
    return phoneRegex.test(phoneNumber);
    }

    document.getElementById('billing').addEventListener('submit', function(event) {
    
    event.preventDefault();

    
    if (validateForm()) {
        const form_billing = document.getElementById("billing");
        const dataDiv = document.getElementById("data");
        const fd = new FormData(form_billing);
        const obj = Object.fromEntries(fd);
        const json = JSON.stringify(obj);

        
        dataDiv.innerHTML = "";

        
        const invoiceInfoDiv = document.createElement("div");
        invoiceInfoDiv.textContent = "Invoice Information";
        invoiceInfoDiv.style.textAlign = "center";
        invoiceInfoDiv.style.fontSize = "28px";
        dataDiv.appendChild(invoiceInfoDiv);

        
        for (key in obj) {
            const div = document.createElement("div");
            const span = document.createElement("span");
            span.textContent = `${key}: ${obj[key]}`;
            div.appendChild(span);
            dataDiv.appendChild(div);
        }

        
        form_billing.reset();
    }
    });