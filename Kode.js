// FILE INI DITEMPEL DI GOOGLE APPSCRIPT (Extensions > Apps Script)

// Fungsi untuk menangani permintaan baca data (GET) dari Web Anda
function doGet(e) {
  // Mengambil sheet yang sedang aktif
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Kita mengambil seluruh data JSON yang disimpan di Cell A1
  var data = sheet.getRange("A1").getValue();
  
  var response = {};
  if (data) {
    response = JSON.parse(data);
  } else {
    response = { message: "Data belum diatur di Spreadsheet." };
  }
  
  // Mengembalikan data sebagai JSON ke frontend web Anda
  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

// Fungsi untuk menangani permintaan simpan data (POST) dari Web Anda
function doPost(e) {
  try {
    // Menerima data dari web
    var dataString = e.postData.contents;
    
    // Menyimpan data tersebut ke Cell A1
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.getRange("A1").setValue(dataString);
    
    // Memberikan respon sukses
    return ContentService.createTextOutput(JSON.stringify({ status: "Success", message: "Data berhasil disimpan!" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    // Memberikan respon error jika gagal
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Catatan penting untuk POST: 
// Frontend web harus mengirim data menggunakan headers { 'Content-Type': 'text/plain;charset=utf-8' }
// agar tidak terkena blokir keamanan CORS Preflight dari Google.