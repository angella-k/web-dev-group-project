const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"), (err) => {
        if (err) console.log(err);
    });
});

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

app.get('/goals.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'goals.json'));
});

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
    
    let signup = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        comments: comments ? comments.trim() : "",
        timestamp: new Date().toISOString()
    };
    
    // Read existing data in the data folder
    let signups = [];
    if (fs.existsSync("data/database.json")) {
        let data = fs.readFileSync("data/database.json", "utf8");
        signups = JSON.parse(data);
    }
    
    // Check if email already exists
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
    
    // Save data to the file
    fs.writeFileSync("data/database.json", JSON.stringify(signups, null, 2));
    
    res.json({ success: true, message: `Thank you for signing up, ${firstName}!` });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}!`);
});