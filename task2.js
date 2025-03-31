const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("htmlll"));
app.use(express.urlencoded({ extended: true })); 
// Set view engine
app.set('view engine', 'ejs');

// Temporary storage
let storedData = [];

// Serve the form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"htmlll","index.html"));
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, mobile, email, password } = req.body;

    // Server-side validation
    if (!name || !mobile || !email || !password) {
        return res.send("<h2 style='color: red;'>All fields are required!</h2><a href='/'>Go Back</a>");
    }

    if (mobile.length !== 10 || isNaN(mobile)) {
        return res.send("<h2 style='color: red;'>Invalid mobile number!</h2><a href='/'>Go Back</a>");
    }

    if (password.length < 6) {
        return res.send("<h2 style='color: red;'>Password must be at least 6 characters long!</h2><a href='/'>Go Back</a>");
    }

    // Store validated data
    storedData.push({ name, mobile, email, password });
    console.log(storedData)

    res.render('display1', { formData: req.body });
});

// Show stored data
app.get('/data', (req, res) => {
    res.render('display1', { formData: storedData });//views folder lo display.ejs chupinchu tarava e comment delete cheyi
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
