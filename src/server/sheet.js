function doPost(e) {

  const sheet = SpreadsheetApp.getActiveSheet();

  if (e.postData.contents) {
    const data = JSON.parse(e.postData.contents);

    const timestamp = new Date().toLocaleString("en-CA", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    sheet.appendRow([timestamp, 
      data.firstName, 
      data.lastName, 
      data.email, 
      data.phone, 
      data.school, 
      data.year, 
      data.department1, 
      data.choice1.work, 
      data.choice1.experience, 
      data.choice1.expectations, 
      data.department2, 
      data.choice2.work, 
      data.choice2.experience, 
      data.choice2.expectations, 
      data.department3, 
      data.choice3.work, 
      data.choice3.experience, 
      data.choice3.expectations]);

    Logger.log(data);

    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success', 'data': data })).setMimeType(ContentService.MimeType.JSON);
  }
  else {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'data': 'No post data received' })).setMimeType(ContentService.MimeType.JSON);
  }
}
