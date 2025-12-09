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
            const logoText = logo.querySelector('.logo-name');

            logo.href = data.logo.url;

            const logoImg = document.createElement('img');
            logoImg.src = data.logo.image.src;
            logoImg.alt = data.logo.image.alt;
            logoImg.classList.add(data.logo.image.class);

            logo.insertBefore(logoImg, logoText);
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

            const footerTop = document.querySelector(".footertop");

            const footerTitle = document.createElement("h3");
            footerTitle.textContent = data.footer;

            footerTop.prepend(footerTitle);

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

            const bannerImageContainer = document.querySelector('.banner-image');

            const img = document.createElement('img');
            img.src = data.banner.image.src;
            img.alt = data.banner.image.alt;

            bannerImageContainer.append(img);

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
    const textSection = document.querySelector('.text-section');
    
    // Check if we're on signup page by looking for the specific class
    const isSignupPage = document.body.classList.contains('signup-page') || 
                         (textSection && !document.querySelector('.banner'));

    // Only run this on signup page
    if (!isSignupPage || document.querySelector('.banner')) return;

    fetch('/signup.json')
        .then(response => response.json())
        .then(data => {

            // Create title and description
            const title = document.createElement('h2');
            title.textContent = data.signup.title;
            
            const description = document.createElement('p');
            description.textContent = data.signup.description;

            // Create form
            const form = document.createElement('form');
            form.id = 'signupForm';
            form.setAttribute('novalidate', '');

            // First Name
            const firstNameLabel = document.createElement('label');
            firstNameLabel.setAttribute('for', 'firstName');
            firstNameLabel.textContent = data.signup.form.labels.firstName.label;
            
            const firstNameInput = document.createElement('input');
            firstNameInput.type = 'text';
            firstNameInput.id = 'firstName';
            firstNameInput.name = 'firstName';
            firstNameInput.required = true;

            // Last Name
            const lastNameLabel = document.createElement('label');
            lastNameLabel.setAttribute('for', 'lastName');
            lastNameLabel.textContent = data.signup.form.labels.lastName.label;
            
            const lastNameInput = document.createElement('input');
            lastNameInput.type = 'text';
            lastNameInput.id = 'lastName';
            lastNameInput.name = 'lastName';
            lastNameInput.required = true;

            // Email
            const emailLabel = document.createElement('label');
            emailLabel.setAttribute('for', 'email');
            emailLabel.textContent = data.signup.form.labels.email.label;
            
            const emailInput = document.createElement('input');
            emailInput.type = 'email';
            emailInput.id = 'email';
            emailInput.name = 'email';
            emailInput.required = true;

            // Message/Comments
            const messageLabel = document.createElement('label');
            messageLabel.setAttribute('for', 'comments');
            messageLabel.textContent = data.signup.form.labels.message.label;
            
            const commentsTextarea = document.createElement('textarea');
            commentsTextarea.id = 'comments';
            commentsTextarea.name = 'comments';
            commentsTextarea.rows = 4;
            commentsTextarea.placeholder = data.signup.form.labels.message.placeholder;

            // Submit button
            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.textContent = data.signup.form.button;

            // Response message
            const responseMessage = document.createElement('p');
            responseMessage.id = 'responseMessage';

            // Append all elements to form
            form.appendChild(firstNameLabel);
            form.appendChild(firstNameInput);
            form.appendChild(lastNameLabel);
            form.appendChild(lastNameInput);
            form.appendChild(emailLabel);
            form.appendChild(emailInput);
            form.appendChild(messageLabel);
            form.appendChild(commentsTextarea);
            form.appendChild(submitButton);
            form.appendChild(responseMessage);

            // Append everything to text section
            textSection.appendChild(title);
            textSection.appendChild(description);
            textSection.appendChild(form);

            // Form submission handler - must be after form is created
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                // Disable submit button to prevent double submission
                submitButton.disabled = true;

                const formBody = {
                    firstName: firstNameInput.value,
                    lastName: lastNameInput.value,
                    email: emailInput.value,
                    comments: commentsTextarea.value
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
                        submitButton.disabled = false; // Re-enable button
                        if (responseData.success) {
                            responseMessage.textContent = responseData.message;
                            responseMessage.style.color = 'green';
                            form.reset();
                        } else {
                            responseMessage.textContent = responseData.message;
                            responseMessage.style.color = 'red';
                        }
                    })
                    .catch(err => {
                        console.error("Fetch error:", err);
                        submitButton.disabled = false; 
                        responseMessage.textContent = 'An error occurred. Please try again.';
                        responseMessage.style.color = 'red';
                    });
            });

        })
        .catch(error => console.error('Error fetching signup data:', error));
});

// Load team.json content if on team page
document.addEventListener('DOMContentLoaded', () => {
    const bannerTeamSection = document.querySelector('.bannerTeam-section');
    
    // Only run this on team page
    if (!bannerTeamSection) return;
    
    fetch('/team.json')
        .then(response => response.json())
        .then(data => {

            // Banner section
            const bannerTeamTitle = document.createElement('h1');
            bannerTeamTitle.textContent = data.bannerTeam.title;
            
            const bannerTeamImage = document.createElement('img');
            bannerTeamImage.classList.add('bannerTeam-image');
            bannerTeamImage.alt = data.bannerTeam.title;
            
            const bannerTeamButton = document.createElement('button');
            bannerTeamButton.classList.add('bannerTeam-button');
            bannerTeamButton.textContent = data.bannerTeam.buttonText;
            bannerTeamButton.onclick = () => location.href = '#team';
            
            // Append banner elements
            bannerTeamSection.appendChild(bannerTeamTitle);
            bannerTeamSection.appendChild(bannerTeamImage);
            bannerTeamSection.appendChild(bannerTeamButton);
            
            // Background image
            bannerTeamSection.style.backgroundImage = `url('${data.bannerTeam.image}')`;
            
            // Section 1
            const section1 = document.querySelector('.content-section-1');
            const section1Heading = document.createElement('h2');
            section1Heading.textContent = data.section1.heading;
            
            const section1Text = document.createElement('p');
            section1Text.textContent = data.section1.text;
            
            section1.appendChild(section1Heading);
            section1.appendChild(section1Text);

            // Team section
            const section2 = document.querySelector('.content-section-2');
            const section2Heading = document.createElement('h2');
            section2Heading.textContent = data.section2.heading;
            
            const teamGrid = document.createElement('div');
            teamGrid.classList.add('team-grid');

            section2.appendChild(section2Heading);
            section2.appendChild(teamGrid);

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

            // Signup section
            const signupSection = document.querySelector('.signup-section');
            const signupBox = document.createElement('div');
            signupBox.classList.add('signup-box');
            
            const signupContent = document.createElement('div');
            signupContent.classList.add('signup-content');
            
            const signupHeading = document.createElement('h2');
            signupHeading.textContent = data.signup.heading;
            
            const signupText = document.createElement('p');
            signupText.textContent = data.signup.text;
            
            const signupButton = document.createElement('button');
            signupButton.classList.add('signup-button');
            signupButton.textContent = data.signup.buttonText;
            signupButton.onclick = () => window.location.href = data.signup.buttonUrl;
            
            signupContent.appendChild(signupHeading);
            signupContent.appendChild(signupText);
            signupBox.appendChild(signupContent);
            signupBox.appendChild(signupButton);
            signupSection.appendChild(signupBox);

            // Resources section
            const resourcesSection = document.querySelector('.resources-section');
            const resourcesGrid = document.createElement('div');
            resourcesGrid.classList.add('resources-grid');
            
            const resourcesContent = document.createElement('div');
            resourcesContent.classList.add('resources-content');
            
            const resourcesHeading = document.createElement('h2');
            resourcesHeading.textContent = data.resources.heading;
            
            const resourcesText = document.createElement('p');
            resourcesText.textContent = data.resources.text;
            
            const resourcesButton = document.createElement('button');
            resourcesButton.classList.add('resources-button');
            resourcesButton.textContent = data.resources.buttonText;
            resourcesButton.onclick = () => window.open(data.resources.buttonUrl, '_blank');
            
            const resourcesImage = document.createElement('img');
            resourcesImage.classList.add('resources-image');
            resourcesImage.src = data.resources.image;
            resourcesImage.alt = data.resources.heading;
            
            resourcesContent.appendChild(resourcesHeading);
            resourcesContent.appendChild(resourcesText);
            resourcesContent.appendChild(resourcesButton);
            resourcesGrid.appendChild(resourcesContent);
            resourcesGrid.appendChild(resourcesImage);
            resourcesSection.appendChild(resourcesGrid);

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

document.addEventListener('DOMContentLoaded', () => {

    fetch('/goals.json')
        .then(response => response.json())
        .then(data => {

            var page = window.location.pathname;

            // ---------------- GENDER PAGE ----------------
            if (page.includes("gender.html")) {

                //intro gender.html
                const introSection = document.getElementById("intro-section3");

                const intro = data.intro1
                const title1 = intro.title
                const introText = intro.Description
                const introbutton = intro.buttonText

                const h1Element = document.createElement('h1')
                h1Element.textContent = title1

                const pElement = document.createElement('p')
                pElement.textContent = introText
                const buttonElement = document.createElement('button')
                buttonElement.setAttribute("class", "banner-button")
                buttonElement.setAttribute("onclick", "location.href='#sect1'")
                buttonElement.textContent = introbutton

                introSection.appendChild(h1Element)
                introSection.appendChild(pElement)
                introSection.appendChild(buttonElement)

                //why this goal matters gender.html
                const sect1 = document.getElementById("sect1")
                const why = data.whyThisGoalMatters1
                const whyHead = why.Heading
                const whyText = why.text

                const sect1h3 = document.createElement('h3')
                sect1h3.textContent = whyHead
                const sect1Text = document.createElement('p')
                sect1Text.textContent = whyText

                sect1.append(sect1h3)
                sect1.append(sect1Text)

                //Possible policies to make change gender.html
                const sect2 = document.getElementById("sect2")
                const articles = document.getElementById("article1")
                const policy = data.localPolicies1
                const policyHead = policy.Heading

                const sect2h3 = document.createElement('h3')
                sect2h3.textContent = policyHead
                sect2.insertBefore(sect2h3, articles)

                //Article loop
                const articlesArray = policy.policies
                const idArray = ["article1", "article2", "article3"]
                for (let i = 0; i < articlesArray.length; i++) {
                    const artId = idArray[i]
                    const art = document.getElementById(artId)
                    const dataArt = policy.policies[i]
                    const dataArtText = dataArt.Text
                    const dataArtImg = dataArt.image
                    const dataArtAlt = dataArt.alt
                    const artText = document.createElement('p')
                    artText.textContent = dataArtText
                    const artImg = document.createElement('img')
                    artImg.setAttribute("src", dataArtImg)
                    artImg.setAttribute("alt", dataArtAlt)

                    art.append(artText)
                    art.append(artImg)
                }

                //additional resources gender.html
                const sect3 = document.getElementById("sect3")
                const sect3left = document.getElementById("sect3-left")
                const sect3right = document.getElementById("sect3-right")
                const resource = data.additionalResources1
                const resourceHead = resource.Heading
                const resourceText = resource.text
                const resourceLink = resource.link
                const resourceURL = resourceLink.url
                const resourceLabel = resourceLink.label
                const bookshelfImage = data.arImage.image
                const bookshelfAlt = data.arImage.alt

                const sect3h3 = document.createElement('h3')
                sect3h3.textContent = resourceHead
                const sect3p = document.createElement('p')
                sect3p.textContent = resourceText

                const sect3a = document.createElement('button')
                sect3a.setAttribute("href", resourceURL)
                sect3a.setAttribute("class","find-out-button")  
                sect3a.textContent = resourceLabel

                const arImg = document.createElement('img')
                arImg.setAttribute("src", bookshelfImage)
                arImg.setAttribute("alt", bookshelfAlt)
                arImg.setAttribute("class","ar-image")

                sect3left.append(sect3h3)
                sect3left.append(sect3p)
                sect3left.append(sect3a)
                sect3right.append(arImg)
            }



            // ---------------- HUNGER PAGE ----------------
            if (page.includes("hunger.html")) {

                const introSection = document.getElementById("intro-section2");

                const intro = data.intro
                const title1 = intro.title
                const introText = intro.Description
                const introbutton = intro.buttonText

                const h1Element = document.createElement('h1')
                h1Element.textContent = title1

                const pElement = document.createElement('p')
                pElement.textContent = introText
                const buttonElement = document.createElement('button')
                buttonElement.setAttribute("class", "banner-button")
                buttonElement.setAttribute("onclick", "location.href='#sect1'")
                buttonElement.textContent = introbutton

                introSection.appendChild(h1Element)
                introSection.appendChild(pElement)
                introSection.appendChild(buttonElement)

                //why this goal matters hunger.html
                const sect1 = document.getElementById("sect1")
                const why = data.whyThisGoalMatters
                const whyHead = why.Heading
                const whyText = why.text

                const sect1h3 = document.createElement('h3')
                sect1h3.textContent = whyHead
                const sect1Text = document.createElement('p')
                sect1Text.textContent = whyText

                sect1.append(sect1h3)
                sect1.append(sect1Text)

                //Possible policies to make change hunger.html
                const sect2 = document.getElementById("sect2")
                const articles = document.getElementById("article1")
                const policy = data.localPolicies
                const policyHead = policy.Heading

                const sect2h3 = document.createElement('h3')
                sect2h3.textContent = policyHead
                sect2.insertBefore(sect2h3,articles)

                //article loop

                const articlesArray = policy.policies
                const idArray = ["article1", "article2", "article3"]
                for (let i = 0; i < articlesArray.length; i++) {
                    const artId = idArray[i]
                    const art = document.getElementById(artId)
                    const dataArt = policy.policies[i]
                    const dataArtText = dataArt.Text
                    const dataArtImg = dataArt.image
                    const dataArtAlt = dataArt.alt
                    const artText = document.createElement('p')
                    artText.textContent = dataArtText
                    const artImg = document.createElement('img')
                    artImg.setAttribute("src", dataArtImg)
                    artImg.setAttribute("alt", dataArtAlt)

                    art.append(artText)
                    art.append(artImg)
                }

                //additional resources hunger.html
                const sect3 = document.getElementById("sect3")
                const sect3left = document.getElementById("sect3-left")
                const sect3right = document.getElementById("sect3-right")
                const resource = data.additionalResources1
                const resourceHead = resource.Heading
                const resourceText = resource.text
                const resourceLink = resource.link
                const resourceURL = resourceLink.url
                const resourceLabel = resourceLink.label
                const bookshelfImage = data.arImage.image
                const bookshelfAlt = data.arImage.alt

                const sect3h3 = document.createElement('h3')
                sect3h3.textContent = resourceHead
                const sect3p = document.createElement('p')
                sect3p.textContent = resourceText

                const sect3a = document.createElement('button')
                sect3a.setAttribute("href", resourceURL)
                sect3a.setAttribute("class","find-out-button")
                sect3a.textContent = resourceLabel

                const arImg = document.createElement('img')
                arImg.setAttribute("src", bookshelfImage)
                arImg.setAttribute("alt", bookshelfAlt)
                arImg.setAttribute("class","ar-image")

                sect3left.append(sect3h3)
                sect3left.append(sect3p)
                sect3left.append(sect3a)
                sect3right.append(arImg)

                
            }

            if (page.includes("cities.html")) {

                const introSection = document.getElementById("intro-section1");

                const intro = data.intro2
                const title1 = intro.title
                const introText = intro.Description
                const introbutton = intro.buttonText

                const h1Element = document.createElement('h1')
                h1Element.textContent = title1

                const pElement = document.createElement('p')
                pElement.textContent = introText
                const buttonElement = document.createElement('button')
                buttonElement.setAttribute("class", "banner-button")
                buttonElement.setAttribute("onclick", "location.href='#sect1'")
                buttonElement.textContent = introbutton

                introSection.appendChild(h1Element)
                introSection.appendChild(pElement)
                introSection.appendChild(buttonElement)

                //why this goal matters cities.html
                const sect1 = document.getElementById("sect1")
                const why = data.whyThisGoalMatters2
                const whyHead = why.Heading
                const whyText = why.text

                const sect1h3 = document.createElement('h3')
                sect1h3.textContent = whyHead
                const sect1Text = document.createElement('p')
                sect1Text.textContent = whyText

                sect1.append(sect1h3)
                sect1.append(sect1Text)

                //Possible policies to make change cities.html
                const sect2 = document.getElementById("sect2")
                const articles = document.getElementById("article1")
                const policy = data.localPolicies2
                const policyHead = policy.Heading

                const sect2h3 = document.createElement('h3')
                sect2h3.textContent = policyHead
                sect2.insertBefore(sect2h3, articles)

                //Article loop
                
                const articlesArray = policy.policies
                const idArray = ["article1", "article2", "article3"]
                for (let i = 0; i < articlesArray.length; i++) {
                    const artId = idArray[i]
                    const art = document.getElementById(artId)
                    const dataArt = policy.policies[i]
                    const dataArtText = dataArt.Text
                    const dataArtImg = dataArt.image
                    const dataArtAlt = dataArt.alt
                    const artText = document.createElement('p')
                    artText.textContent = dataArtText
                    const artImg = document.createElement('img')
                    artImg.setAttribute("src", dataArtImg)
                    artImg.setAttribute("alt", dataArtAlt)

                    art.append(artText)
                    art.append(artImg)
                }

                //additional resources cities.html
                const sect3 = document.getElementById("sect3")
                const sect3left = document.getElementById("sect3-left")
                const sect3right = document.getElementById("sect3-right")
                const resource = data.additionalResources2
                const resourceHead = resource.Heading
                const resourceText = resource.text
                const resourceLink = resource.link
                const resourceURL = resourceLink.url
                const resourceLabel = resourceLink.label
                const bookshelfImage = data.arImage.image
                const bookshelfAlt = data.arImage.alt

                const sect3h3 = document.createElement('h3')
                sect3h3.textContent = resourceHead
                const sect3p = document.createElement('p')
                sect3p.textContent = resourceText

                const sect3a = document.createElement('button')
                sect3a.setAttribute("href", resourceURL)
                sect3a.setAttribute("class","find-out-button")
                sect3a.textContent = resourceLabel

                const arImg = document.createElement('img')
                arImg.setAttribute("src", bookshelfImage)
                arImg.setAttribute("alt", bookshelfAlt)
                arImg.setAttribute("class","ar-image")

                sect3left.append(sect3h3)
                sect3left.append(sect3p)
                sect3left.append(sect3a)
                sect3right.append(arImg)
            }
        })

        .catch(error => console.error('Error fetching signup data:', error));
});
