require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.send("Save your data to Google Sheet.")
});

app.post("/", function (req, res) {
    // appending response date and time to FORM Data
    const date = {"Date": new Date().toLocaleDateString()};
    const time = {"Time": new Date().toLocaleTimeString()};

    // creating form object with data, response date and time
    let form = Object.assign(req.body, date, time);

    // Post request to Google Sheet API
    axios.post(process.env.GOOGLE_SHEET_API, form, {
        headers: {"Content-Type": "multipart/form-data"},
    }).then(function (response) {
        if (response.data.result === "success") {
            res.send("Successfully inserted data in Google Sheets.")
        }
    }).catch(function (error) {
        res.send(error.message)
    });
});

app.get("*", function (req, res) {
    res.redirect("/")
})

app.listen(port, function () {
    console.log(`Serve at http://localhost:${port}`);
});