
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
        main.style.marginTop = '220px';
    } else {
        main.style.marginTop = '0';
    }
}

//ensuring html is loaded before the js runs
document.addEventListener('DOMContentLoaded', () => {

    // fetch and display JSON data for header/topnav
    fetch('/headerFooter.json')
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

            //footer

            const title = document.querySelector(".footer-title");
            title.textContent = data.footer;

            const list = document.querySelector(".footer-links");

            data.links.forEach(link => {
                const li = document.createElement("li");
                const a = document.createElement("a");

                a.href = link.url;
                a.textContent = link.text;

                li.appendChild(a);
                list.appendChild(li);
            });

            const footerBottom = document.querySelector(".footerbottom");
            const copyright = document.createElement('p');
            copyright.textContent = data.copyright;
            footerBottom.appendChild(copyright);

        })
        .catch(error => console.error('Error fetching header data:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('/index.json')
        .then(response => response.json())
        .then(data => {

            //loading in json content to html file for the banner
            const banner = document.querySelector('.banner');
            const bannerTitle = document.createElement('h1');
            const bannerText = document.createElement('p');

            bannerTitle.textContent = data.banner.title;
            bannerText.textContent = data.banner.text;

            banner.appendChild(bannerTitle);
            banner.appendChild(bannerText);

            const bannerImage = document.querySelector('.image');
            bannerImage.src = data.banner.image.src;
            bannerImage.alt = data.banner.image.alt;

            //loading in json content for text section
            const textSection = document.querySelector('.text-section');
            const textTitle = document.createElement('h2');
            const text = document.createElement('p');

            textTitle.textContent = data.text.title;
            text.textContent = data.text.text;

            textSection.appendChild(textTitle);
            textSection.appendChild(text);

            //loading in json content for goals section
            const goalsSection = document.querySelector('.goals-section');
            const goal1 = document.querySelector('.goal1');
            const goal2 = document.querySelector('.goal2');
            const goal3 = document.querySelector('.goal3');
            //goal 1
            const goalClass = ["goal1", "goal2", "goal3"];
            const goalData = [data.goal1, data.goal2, data.goal3];

            for (let i = 0; i < goalClass.length; i++) {
                const article = document.querySelector("." + goalClass[i]);
                const goal = goalData[i];

                const title = document.createElement("h2");
                title.textContent = goal.title;

                const button = document.createElement("a");
                button.textContent = goal.button;
                button.href = goal.url;
                button.classList.add("button");

                article.appendChild(title);
                article.appendChild(button);
            }

        })
        .catch(error => console.error('Error fetching index data:', error));
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