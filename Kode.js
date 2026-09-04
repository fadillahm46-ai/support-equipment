const SHEET_NAME = "Sheet1"; // Sesuaikan dengan nama tab di Spreadsheet Anda

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);

    // Simpan seluruh JSON ke Sel A1
    sheet.getRange("A1").setValue(JSON.stringify(data));

    return ContentService.createTextOutput(JSON.stringify({ success: true, message: "Data berhasil disimpan!" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const dataString = sheet.getRange("A1").getValue();

    // Jika A1 kosong, kembalikan pesan belum diatur
    if (!dataString) {
      return ContentService.createTextOutput(JSON.stringify({ message: "Data belum diatur di Spreadsheet." }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(dataString)
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fungsi wajib untuk menangani CORS Preflight dari Vercel
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}