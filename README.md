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

### 1. Set up a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new sheet.
2. Set the following headers in the first row according to data you want to store.

### 2. Create a Google App Script
Click on `Extensions -> Apss Script`. This will open new Google Script.
Replace the `myFunction() { ...` section with the following code snippet:

```js
var sheetName = 'Sheet1'
var scriptProp = PropertiesService.getScriptProperties()

function intialSetup() {
    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost(e) {
    var lock = LockService.getScriptLock()
    lock.tryLock(10000)

    try {
        var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
        var sheet = doc.getSheetByName(sheetName)

        var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
        var nextRow = sheet.getLastRow() + 1

        var newRow = headers.map(function(header) {
            return header === 'timestamp' ? new Date() : e.parameter[header]
        })

        sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

        return ContentService
            .createTextOutput(JSON.stringify({
                'result': 'success',
                'row': nextRow
            }))
            .setMimeType(ContentService.MimeType.JSON)
    } catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({
                'result': 'error',
                'error': e
            }))
            .setMimeType(ContentService.MimeType.JSON)
    } finally {
        lock.releaseLock()
    }
}
```

### 3. Run the initialSetup function
You should see a modal asking for permissions. Click `Review permissions` and continue to the next screen.

### 4. Publish the project
Now your project is ready to publish. Select the `Deploy` button and `New Deployment` from the drop-down.
Click the "Select type" icon and select `Web app`. 

### 5. Input
<img src="https://github.com/ksalokya/google_sheet_api/blob/main/misc/postman.jpg">

### 6. Output
<img src="https://github.com/ksalokya/google_sheet_api/blob/main/misc/output.jpg">
