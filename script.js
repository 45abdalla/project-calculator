document.addEventListener("DOMContentLoaded", function() {
    // Back to Top Button
    const backToTopButton = document.getElementById("backToTop");
    if (backToTopButton) {
        window.onscroll = function() {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                backToTopButton.style.display = "block";
            } else {
                backToTopButton.style.display = "none";
            }
        };
        backToTopButton.addEventListener("click", function() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Tip Calculator
    const tipForm = document.getElementById("tipForm");
    if (tipForm) {
        tipForm.addEventListener("submit", function(e) {
            e.preventDefault();

                  const bill = parseFloat(document.getElementById("bill").value);
                  const people = parseInt(document.getElementById("people").value);
            if (isNaN(bill) ||  isNaN(people) || bill <= 0 || people < 0) {
                alert("Please enter valid positive numbers.");
                return;
            }
            const tipAmount = (bill).toFixed(1);
            const totalPerPerson = ((bill / people).toFixed(2));
            document.getElementById("tipAmount").textContent = tipAmount;
            document.getElementById("totalPerPerson").textContent = totalPerPerson;
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    const contactResponse = document.getElementById('contactResponse');
    if (contactForm && contactResponse) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if(input.value.trim() === '') {
                    input.style.borderColor = 'red';
                } else if(input.type === 'email' && !validateEmail(input.value)) {
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = 'green';
                }
            });
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            if(name === '' || email === '' || message === '') {
                showMessage('Please fill out all fields.', 'red');
                highlightEmptyFields();
                return;
            }
            if(!validateEmail(email)) {
                showMessage('Please enter a valid email.', 'red');
                document.getElementById('email').style.borderColor = 'red';
                return;
            }
            showMessage(`Thank you, ${name}! Your message has been sent.`, 'green');
            contactForm.reset();
            inputs.forEach(input => input.style.borderColor = '#ccc');
        });

        function showMessage(msg, color) {
            contactResponse.textContent = msg;
            contactResponse.style.color = color;
            contactResponse.style.opacity = 1;
            setTimeout(() => {
                contactResponse.style.transition = 'opacity 0.5s';
                contactResponse.style.opacity = 0;
            }, 3000);
        }

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function highlightEmptyFields() {
            if(document.getElementById('name').value.trim() === '') {
                document.getElementById('name').style.borderColor = 'red';
            }
            if(document.getElementById('email').value.trim() === '') {
                document.getElementById('email').style.borderColor = 'red';
            }
            if(document.getElementById('message').value.trim() === '') {
                document.getElementById('message').style.borderColor = 'red';
            }
        }
    }
});


// ---------- DEFAULT ADMIN ----------
let users = JSON.parse(localStorage.getItem("users")) || [];

// Add default admin if not exists
if (!users.some(u => u.username === "admin")) {
    users.push({ username: "admin", password: "1234" });
    localStorage.setItem("users", JSON.stringify(users));
}

// ---------- SIGNUP ----------
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const newUsername = document.getElementById("newUsername").value;
        const newPassword = document.getElementById("newPassword").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(user => user.username === newUsername)) {
            document.getElementById("signup-msg").textContent = "Username already exists!";
            return;
        }

        users.push({ username: newUsername, password: newPassword });
        localStorage.setItem("users", JSON.stringify(users));

        document.getElementById("signup-msg").style.color = "green";
        document.getElementById("signup-msg").textContent = "Signup successful! You can login now.";
        signupForm.reset();
    });
}

// ---------- LOGIN ----------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const found = users.find(
            user => user.username === username && user.password === password
        );

        if (found) {
            // Save logged-in user in localStorage
            localStorage.setItem("loggedInUser", username);
            window.location.href = "index.html";
        } else {
            document.getElementById("error-msg").textContent =
                "Invalid username or password!";
        }
    });
}

// ---------- CONNECT PAGE ----------
const userDisplay = document.getElementById("userDisplay");
if (userDisplay) {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        // if no user is logged in, redirect to login page
        window.location.href = 'index.html';
    } else {
        userDisplay.textContent = loggedInUser;
    }
}
