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


// Run when hamburger is clicked
checkbox.addEventListener('change', function() {
    updateMargin();
});

// Run when screen is resized
window.addEventListener("resize", function() {
    updateMargin();
});
