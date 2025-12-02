const checkbox = document.getElementById('hamburger');
const main = document.querySelector('main');

checkbox.addEventListener('change', function() {
    if (this.checked) {
        main.style.marginTop = '125px';
    } else {
        main.style.marginTop = '0';
    }
});

// when hamburger is clicked
checkbox.addEventListener('change', function() {
    updateMargin();
});

// when screen is resized
window.addEventListener("resize", function() {
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
