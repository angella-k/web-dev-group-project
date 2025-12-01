const checkbox = document.getElementById('hamburger');
const main = document.querySelector('main');

checkbox.addEventListener('change', function() {
    if (this.checked) {
        main.style.marginTop = '130px';
    } else {
        main.style.marginTop = '0';
    }
});