# Submit a HTML form to Google Sheets

### Replace "process.env.GOOGLE_SHEET_API" with Google Sheet End Point.
```js
    axios.post(process.env.GOOGLE_SHEET_API, form, {
        headers: {"Content-Type": "multipart/form-data"},
    }).then(function (response) {
        if (response.data.result === "success") {
            res.send("Successfully inserted data in Google Sheets.")
        }
    }).catch(function (error) {
        res.send(error.message)
    });
```

### Input
<img src="https://github.com/ksalokya/google_sheet_api/blob/main/misc/postman.jpg">

### Output
<img src="https://github.com/ksalokya/google_sheet_api/blob/main/misc/output.jpg">
