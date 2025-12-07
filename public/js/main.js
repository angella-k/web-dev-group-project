// adjusts main margin when hamburger is active 
const checkbox = document.getElementById('hamburger');
const main = document.querySelector('main');

// When hamburger is clicked
checkbox.addEventListener('change', function () {
    updateMargin();
});

// When screen is resized
window.addEventListener("resize", function () {
    updateMargin();
});

function updateMargin() {
    const width = window.innerWidth;

    // Reset on desktop
    if (width > 700) {
        main.style.marginTop = '0';
        return;
    }

    // Mobile and tablet
    if (checkbox.checked && width < 700) {
        main.style.marginTop = '220px';
    } else {
        main.style.marginTop = '0';
    }
}

// Ensuring html is loaded before the js runs
document.addEventListener('DOMContentLoaded', () => {

    // Fetch and display JSON data for header/topnav
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

            // Footer

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

// Load index.json content if on index page
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.banner');
    
    // Only run this on index page
    if (!banner) return;
    
    fetch('/index.json')
        .then(response => response.json())
        .then(data => {

            // loading in json content to html file for the banner
            const bannerTitle = document.createElement('h1');
            const bannerText = document.createElement('p');

            bannerTitle.textContent = data.banner.title;
            bannerText.textContent = data.banner.text;

            banner.appendChild(bannerTitle);
            banner.appendChild(bannerText);

            const bannerImage = document.querySelector('.image');
            bannerImage.src = data.banner.image.src;
            bannerImage.alt = data.banner.image.alt;

            // loading in json content for text section
            const textSection = document.querySelector('.text-section');
            const textTitle = document.createElement('h2');
            const text = document.createElement('p');

            textTitle.textContent = data.text.title;
            text.textContent = data.text.text;

            textSection.appendChild(textTitle);
            textSection.appendChild(text);

            // loading in json content for goals section
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

// Load signup.json content if on signup page
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    
    // Only run this on signup page
    if (!signupForm) return;
    
    fetch('/signup.json')
        .then(response => response.json())
        .then(data => {
            
            // Title and description
            const textSection = document.querySelector('.text-section');
            const title = textSection.querySelector('h2');
            const description = textSection.querySelector('p');
            
            title.textContent = data.signup.title;
            description.textContent = data.signup.description;
            
            // Form labels
            const firstNameLabel = document.querySelector('label[for="firstName"]');
            firstNameLabel.textContent = data.signup.form.labels.firstName.label;
            
            const lastNameLabel = document.querySelector('label[for="lastName"]');
            lastNameLabel.textContent = data.signup.form.labels.lastName.label;
            
            const emailLabel = document.querySelector('label[for="email"]');
            emailLabel.textContent = data.signup.form.labels.email.label;
            
            const messageLabel = document.querySelector('label[for="comments"]');
            messageLabel.textContent = data.signup.form.labels.message.label;
            
            // Textarea
            const commentsTextarea = document.getElementById('comments');
            commentsTextarea.placeholder = data.signup.form.labels.message.placeholder;
            
            // Submit button
            const submitButton = signupForm.querySelector('button[type="submit"]');
            submitButton.textContent = data.signup.form.button;
            
        })
        .catch(error => console.error('Error fetching signup data:', error));
});

// Load team.json content if on team page
document.addEventListener('DOMContentLoaded', () => {
    const banner1Section = document.querySelector('.banner1-section');
    
    // Only run this on team page
    if (!banner1Section) return;
    
    fetch('/team.json')
        .then(response => response.json())
        .then(data => {
            
            // Banner section
            const banner1Title = banner1Section.querySelector('h1');
            const banner1Button = banner1Section.querySelector('.banner1-button');
            
            banner1Title.textContent = data.banner1.title;
            banner1Button.textContent = data.banner1.buttonText;
            
            // Background image
            banner1Section.style.backgroundImage = `url('${data.banner1.image}')`;
            
            // Section 1
            const section1 = document.querySelector('.content-section-1');
            const section1Heading = section1.querySelector('h2');
            const section1Text = section1.querySelector('p');
            
            section1Heading.textContent = data.section1.heading;
            section1Text.textContent = data.section1.text;
            
            // Team section
            const section2 = document.querySelector('.content-section-2');
            const section2Heading = section2.querySelector('h2');
            const teamGrid = section2.querySelector('.team-grid');
            
            section2Heading.textContent = data.section2.heading;
            
            data.section2.members.forEach(member => {
                const memberDiv = document.createElement('div');
                memberDiv.classList.add('team-member');
                
                const memberName = document.createElement('h3');
                memberName.textContent = member.name;
                
                const memberDesc = document.createElement('p');
                memberDesc.textContent = member.description;
                
                const memberImage = document.createElement('img');
                memberImage.src = member.image;
                memberImage.alt = member.name;
                memberImage.classList.add('team-member-image');
                
                memberDiv.appendChild(memberName);
                memberDiv.appendChild(memberDesc);
                memberDiv.appendChild(memberImage);
                teamGrid.appendChild(memberDiv);
            });
            
            // signup section
            const signupContent = document.querySelector('.signup-content');
            const signupHeading = signupContent.querySelector('h2');
            const signupText = signupContent.querySelector('p');
            const signupButton = document.querySelector('.signup-button');
            
            signupHeading.textContent = data.signup.heading;
            signupText.textContent = data.signup.text;
            signupButton.textContent = data.signup.buttonText;
            signupButton.onclick = () => window.location.href = data.signup.buttonUrl;
            
            // Resources section
            const resourcesContent = document.querySelector('.resources-content');
            const resourcesHeading = resourcesContent.querySelector('h2');
            const resourcesText = resourcesContent.querySelector('p');
            const resourcesButton = resourcesContent.querySelector('.resources-button');
            const resourcesImage = document.querySelector('.resources-image');
            
            resourcesHeading.textContent = data.resources.heading;
            resourcesText.textContent = data.resources.text;
            resourcesButton.textContent = data.resources.buttonText;
            resourcesButton.onclick = () => window.open(data.resources.buttonUrl, '_blank');
            resourcesImage.src = data.resources.image;
            resourcesImage.alt = data.resources.heading;
            
        })
        .catch(error => console.error('Error fetching team data:', error));
});

// Form submission handler
let myForm = document.getElementById('signupForm');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let email = document.getElementById('email');
let comments = document.getElementById('comments');
let confirmMessage = document.getElementById('responseMessage');

if (myForm) {
    myForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Disable submit button to prevent double submission
        const submitBtn = myForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;

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
                submitBtn.disabled = false; // Re-enable button
                if (responseData.success) {
                    confirmMessage.textContent = responseData.message;
                    confirmMessage.style.color = 'green';
                    myForm.reset();
                } else {
                    confirmMessage.textContent = responseData.message;
                    confirmMessage.style.color = 'red';
                }
            })
            .catch(err => {
                console.error("Fetch error:", err);
                submitBtn.disabled = false; // Re-enable on error
            });
    });
}