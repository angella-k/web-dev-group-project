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
    if (fs.existsSync("data/signups.json")) {
        let data = fs.readFileSync("data/signups.json", "utf8");
        signups = JSON.parse(data);
    }
    
    // Add new signup data CREATE A THING TO CHECK IF THERE IS ALREADY THE SAME EMAIL
    signups.push(signup);
    
    // Create data folder incase it isn't there
    if (!fs.existsSync("data")) {
        fs.mkdirSync("data");
    }
    
    // Save data to the file
    fs.writeFileSync("data/signups.json", JSON.stringify(signups, null, 2));
    
    res.json({ success: true, message: `Thank you for signing up, ${firstName}!` });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}!`);
});