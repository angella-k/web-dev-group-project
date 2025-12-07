const express = require("express");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Server's email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'groupm18webdev@gmail.com',
        pass: 'cexr fifq nrnx ioiq'  
    }
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"), (err) => {
        if (err) console.log(err);
    });
});

// Retreives the json content for each html file
app.get("/headerFooter.json", (req, res) => {
    res.sendFile(path.join(__dirname, "data", "headerFooter.json"));
});

app.get('/index.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'index.json'));
});

app.get('/signup.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'signup.json'));
});

app.get('/team.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'team.json'));
});

// Email validation
app.post("/contact", (req, res) => {
    console.log(req.body);
    
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let comments = req.body.comments;
    
    // Input validation
    if (!firstName || firstName.trim().length < 2) {
        return res.status(400).json({ success: false, message: "Invalid first name" });
    }
    if (!lastName || lastName.trim().length < 2) {
        return res.status(400).json({ success: false, message: "Invalid last name" });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email" });
    }
    // Signup informaiton
    let signup = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        comments: comments ? comments.trim() : "",
        timestamp: new Date().toISOString()
    };
    
    // Reads the existing data in the data folder
    let signups = [];
    if (fs.existsSync("data/database.json")) {
        let data = fs.readFileSync("data/database.json", "utf8");
        signups = JSON.parse(data);
    }

    // Checks if email already exists, and returns a message to let the user know
    const existingEmail = signups.find((entry) => entry.email.toLowerCase() === signup.email.toLowerCase());
    if (existingEmail) {
        return res.json({success: false, message: `${email} is already signed up!`});
    }

    // Add new signup data
    signups.push(signup);
    
    // Create data folder in case it isn't there
    if (!fs.existsSync("data")) {
        fs.mkdirSync("data");
    }
    
    // Save the data to the file
    fs.writeFileSync("data/database.json", JSON.stringify(signups, null, 2));
    
    // Send an email notification to verify it worked
    const mail = {
        from: 'groupm18webdev@gmail.com',
        to: email,  // Send to the user's email
        subject: 'SignUp confirmation',
        html: `
            <h2>This is a message to confirm your signup!</h2>
            <p>Hello ${firstName},</p>
            <p>Thank you for signing up.</p>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${comments || 'N/A'}</p>
            <br>
            <p>Kind regards,<br>Sustainability Advisory Committee</p>
            <footer>copyright © 2025 Sustainability Advisory Committee, All rights reserved.</footer>
        `
    };
    
    transporter.sendMail(mail, (error, info) => {
        if (error) {
            console.error('Email error:', error);
            // Let's the user know if it couldn't be sent
            return res.json({ success: false, message: `There was an error signing up, please try again.` });
        }
        console.log('Email sent:', info.response);
        res.json({ success: true, message: `Thank you for signing up, ${firstName}!` });
    });
});
// The website port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}!`);
});