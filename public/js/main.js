const checkbox = document.getElementById('hamburger');
const main = document.querySelector('main');

checkbox.addEventListener('change', function() {
    if (this.checked) {
        main.style.marginTop = '125px';
    } else {
        main.style.marginTop = '0';
    }
});

window.addEventListener("resize", function() {
    var width = window.innerWidth;

    if (width < 600) {
        main.style.marginTop = '125px';
    } else {
        main.style.marginTop = '0';
    }
});


let myForm = document.getElementById('signupForm');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let email = document.getElementById('email');
let comments = document.getElementById('comments');
let confirmMessage = document.getElementById('responseMessage');

if (myForm) {
    myForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formBody = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            comments: comments.value
        };
        
        const requestHeaders = {
            "Content-Type": "application/json"
        };
        
        fetch("/contact", {
            method: "POST",
            headers: requestHeaders,
            body: JSON.stringify(formBody)
        })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData);
            if (responseData.success) {
                confirmMessage.textContent = responseData.message;
                confirmMessage.style.color = 'green';
                myForm.reset();
            } else {
                confirmMessage.textContent = responseData.message;
                confirmMessage.style.color = 'red';
            }
        })
        .catch(err => console.error("Fetch error:", err));
    });
}