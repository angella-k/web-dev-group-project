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

//Temp goals java
document.addEventListener('DOMContentLoaded', () => {
    const body = document.getElementById("goalpage");
    const gender = document.getElementById("gender");
    const hunger = document.getElementById("hunger");
    const cities = document.getElementById("cities");
    

    //goal page js
    if (body) {
    
    fetch('/goals.json')
        .then(response => response.json())
        .then(data => {
            //gender goal page
            if (gender){
            //intro gender.html
            const intro = data.intro1
            const title1 = intro.title
            const introText = intro.Description

            const h1Element = document.createElement('h1')
            h1Element.textContent = title1
            
            const pElement = document.createElement('p')
            pElement.textContent = introText

            gender.appendChild(h1Element)
            gender.appendChild(pElement)
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
            const policy = data.localPolicies1
            const policyHead = policy.Heading
            
            const sect2h3 = document.createElement('h3')
            sect2h3.textContent = policyHead
            sect2.append(sect2h3)
            
            //Article loop
            const articlesArray = policy.policies
            const idArray = ["article1","article2","article3"]
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
            artImg.setAttribute("src",dataArtImg)
            artImg.setAttribute("alt",dataArtAlt)

            art.append(artText)
            art.append(artImg)
            }

            

            //additional resources gender.html
            const sect3 = document.getElementById("sect3")
            const resource = data.additionalResources1
            const resourceHead = resource.Heading
            const resourceText = resource.text
            const resourceLink = resource.link
            const resourceURL = resourceLink.url
            const resourceLabel = resourceLink.label

            const sect3h3 = document.createElement('h3')
            sect3h3.textContent = resourceHead
            const sect3p = document.createElement('p')
            sect3p.textContent = resourceText

            const sect3a = document.createElement('a')
            sect3a.setAttribute("href",resourceURL)
            sect3a.textContent = resourceLabel

            sect3.append(sect3h3)
            sect3.append(sect3p)
            sect3.append(sect3a)}

        //hunger goal page
        if (hunger) {
            //intro hunger.html
            const intro = data.intro
            const title1 = intro.title
            const introText = intro.Description

            const h1Element = document.createElement('h1')
            h1Element.textContent = title1
            
            const pElement = document.createElement('p')
            pElement.textContent = introText

            hunger.appendChild(h1Element)
            hunger.appendChild(pElement)
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
            const policy = data.localPolicies
            const policyHead = policy.Heading
            
            const sect2h3 = document.createElement('h3')
            sect2h3.textContent = policyHead
            sect2.append(sect2h3)
            
            //Article loop
            const articlesArray = policy.policies
            const idArray = ["article1","article2","article3"]
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
            artImg.setAttribute("src",dataArtImg)
            artImg.setAttribute("alt",dataArtAlt)

            art.append(artText)
            art.append(artImg)
            }

            

            //additional resources hunger.html
            const sect3 = document.getElementById("sect3")
            const resource = data.additionalResources
            const resourceHead = resource.Heading
            const resourceText = resource.text
            const resourceLink = resource.link
            const resourceURL = resourceLink.url
            const resourceLabel = resourceLink.label

            const sect3h3 = document.createElement('h3')
            sect3h3.textContent = resourceHead
            const sect3p = document.createElement('p')
            sect3p.textContent = resourceText

            const sect3a = document.createElement('a')
            sect3a.setAttribute("href",resourceURL)
            sect3a.textContent = resourceLabel

            sect3.append(sect3h3)
            sect3.append(sect3p)
            sect3.append(sect3a)}

        //Cities goal page 

        if (cities) {
            //intro cities.html
            const intro = data.intro2
            const title1 = intro.title
            const introText = intro.Description

            const h1Element = document.createElement('h1')
            h1Element.textContent = title1
            
            const pElement = document.createElement('p')
            pElement.textContent = introText

            cities.appendChild(h1Element)
            cities.appendChild(pElement)
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
            const policy = data.localPolicies2
            const policyHead = policy.Heading
            
            const sect2h3 = document.createElement('h3')
            sect2h3.textContent = policyHead
            sect2.append(sect2h3)
            
            //Article loop
            const articlesArray = policy.policies
            const idArray = ["article1","article2","article3"]
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
            artImg.setAttribute("src",dataArtImg)
            artImg.setAttribute("alt",dataArtAlt)

            art.append(artText)
            art.append(artImg)
            }

            

            //additional resources cities.html
            const sect3 = document.getElementById("sect3")
            const resource = data.additionalResources2
            const resourceHead = resource.Heading
            const resourceText = resource.text
            const resourceLink = resource.link
            const resourceURL = resourceLink.url
            const resourceLabel = resourceLink.label

            const sect3h3 = document.createElement('h3')
            sect3h3.textContent = resourceHead
            const sect3p = document.createElement('p')
            sect3p.textContent = resourceText

            const sect3a = document.createElement('a')
            sect3a.setAttribute("href",resourceURL)
            sect3a.textContent = resourceLabel

            sect3.append(sect3h3)
            sect3.append(sect3p)
            sect3.append(sect3a)}



    })
    .catch(err => console.error("Fetch error:", err))




}});

/*articles gender.html
            const art1 = document.getElementById("article1")
            const dataArt1 = policy.policies[0]
            const artText1 = dataArt1.text
            const artImg1 = dataArt1.image
            const artAlt1 = dataArt1.alt
            const art1Text = document.createElement('p')
            art1Text.textContent = artText1 
            const art1Img = document.createElement('img')
            art1Img.setAttribute("src",artImg1)
            art1Img.setAttribute("alt",artAlt1)

            art1.append(art1Text)
            art1.append(art1Img)

            const art2 = document.getElementById("article2")
            const dataArt2 = policy.policies[1]
            const artText2 = dataArt2.text
            const artImg2 = dataArt2.image
            const artAlt2 = dataArt2.alt
            const art2Text = document.createElement('p')
            art2Text.textContent = artText2
            const art2Img = document.createElement('img')
            art2Img.setAttribute("src",artImg2)
            art2Img.setAttribute("alt",artAlt2)

            art2.append(art2Text)
            art2.append(art2Img)

            const art3 = document.getElementById("article3")
            const dataArt3 = policy.policies[2]
            const artText3 = dataArt3.text
            const artImg3 = dataArt3.image
            const artAlt3 = dataArt3.alt
            const art3Text = document.createElement('p')
            art3Text.textContent = artText3
            const art3Img = document.createElement('img')
            art3Img.setAttribute("src",artImg3)
            art3Img.setAttribute("alt",artAlt3)

            art3.append(art3Text)
            art3.append(art3Img)*/