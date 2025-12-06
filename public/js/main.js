
// adjusts main margin when hamburger is active 
const checkbox = document.getElementById('hamburger');
const main = document.querySelector('main');

// when hamburger is clicked
checkbox.addEventListener('change', function () {
    updateMargin();
});

// when screen is resized
window.addEventListener("resize", function () {
    updateMargin();
});

function updateMargin() {
    const width = window.innerWidth;

    // reset on desktop
    if (width > 700) {
        main.style.marginTop = '0';
        return;
    }

    // mobile and tablet
    if (checkbox.checked && width < 700) {
        main.style.marginTop = '200px';
    } else {
        main.style.marginTop = '0';
    }
}

// fetch and display JSON data for header/topnav
document.addEventListener('DOMContentLoaded', () => {
    fetch('/header.json')
        .then(response => response.json())
        .then(data => {

            const logo = document.querySelector('.logo-text');
            const logoImg = logo.querySelector('.logo');
            const logoText = logo.querySelector('.logo-name');

            logo.href = data.logo.url;
            logoImg.src = data.logo.src;
            logoText.textContent = data.logo.text;

            const dropbtn = document.querySelector('.dropbtn');
            const dropdownContainer = document.querySelector('.dropdown-goals');

            const dropdownItem = data.nav.find(item => item.type === 'dropdown');

            dropbtn.textContent = dropdownItem.label;

            dropdownItem.items.forEach(item => {
                const link = document.createElement('a');
                link.href = item.url;
                link.textContent = item.text;
                dropdownContainer.appendChild(link);
            });

            const nav = document.querySelector('.topnav');

            data.nav
                .filter(item => item.type === 'topnav')
                .forEach(item => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');

                    a.href = item.url;
                    a.textContent = item.text;
                    li.appendChild(a);
                    nav.appendChild(li);
                });



        })
        .catch(error => console.error('Error fetching header data:', error));
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