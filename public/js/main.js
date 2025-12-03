
// adjusts main margin when hamburger is active 
const checkbox = document.getElementById('hamburger');
const main = document.querySelector('main');

checkbox.addEventListener('change', function () {
    if (this.checked) {
        main.style.marginTop = '110px';
    } else {
        main.style.marginTop = '0';
    }
});

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
        main.style.marginTop = '125px';
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

            const nav = document.querySelector('.nav-link');

            data.nav.forEach(item => { 
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
