# Google Apps Script Backend Code (`kodeappscript.gs`)

This is the complete server-side code that runs on Google's servers and manages your Google Sheet database. Copy the entire content below and paste it into the `Code.gs` file in your Google Apps Script editor.

```javascript
// =====================================================================================
// MANRURA - Google Apps Script Backend
// =====================================================================================

// --- Kunci Lembar dan Nama Lembar ---
const SHEET_USERS = "Users";
const SHEET_WARDS = "Wards";
const SHEET_ASSESSMENTS = "Assessments";
const SHEET_PERIODS = "AssessmentPeriods";
const SHEET_CONFIG = "Config";
const CONFIG_KEY_DRIVE_FOLDER_ID = "driveFolderId";

// =====================================================================================
// FUNGSI UTAMA - SETUP
// Jalankan fungsi ini sekali dari editor Apps Script untuk menginisialisasi spreadsheet.
// =====================================================================================
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = {
    [SHEET_USERS]: ["id", "name", "email", "password", "role", "wardId"],
    [SHEET_WARDS]: ["id", "name"],
    [SHEET_PERIODS]: ["id", "name", "startDate", "endDate"],
    [SHEET_ASSESSMENTS]: [
      "uniqueId", // wardId + poinId
      "wardId",
      "poinId",
      "wardStaffScore",
      "wardStaffNotes",
      "wardStaffEvidence", // JSON string of Evidence object
      "assessorScore",
      "assessorNotes",
      "assessorEvidence", // JSON string of Evidence object
      "assessorId"
    ],
    [SHEET_CONFIG]: ["key", "value"],
  };

  // Buat sheet jika belum ada dan atur header
  for (const sheetName in sheets) {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }
    sheet.getRange(1, 1, 1, sheets[sheetName].length).setValues([sheets[sheetName]]);
    sheet.setFrozenRows(1);
    SpreadsheetApp.flush(); // Terapkan perubahan
  }
  
  // Buat folder Google Drive untuk unggahan
  const configSheet = ss.getSheetByName(SHEET_CONFIG);
  const folderId = getConfigValue(CONFIG_KEY_DRIVE_FOLDER_ID);
  if (!folderId) {
    try {
      const folder = DriveApp.createFolder("MANRURA_Uploads");
      folder.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW); // Izinkan siapa saja melihat
      setConfigValue(CONFIG_KEY_DRIVE_FOLDER_ID, folder.getId());
      Logger.log("Folder 'MANRURA_Uploads' berhasil dibuat dengan ID: " + folder.getId());
    } catch (e) {
      Logger.log("Gagal membuat folder Google Drive: " + e.toString());
      SpreadsheetApp.getUi().alert("Gagal membuat folder Google Drive. Pastikan API Drive diaktifkan di proyek Apps Script Anda.");
    }
  }

  SpreadsheetApp.getUi().alert("Setup Selesai! Spreadsheet Anda telah siap digunakan.");
}

// =====================================================================================
// ENTRY POINT API - doPost
// Semua permintaan dari frontend akan masuk melalui fungsi ini.
// =====================================================================================
function doPost(e) {
  try {
    const request = JSON.parse(e.postData.contents);
    const action = request.action;
    const payload = request.payload;
    let responseData;

    switch (action) {
      case 'getAllData':
        responseData = getAllData();
        break;
      case 'addUser':
        responseData = addUser(payload);
        break;
      case 'addWard':
        responseData = addWard(payload);
        break;
      case 'addAssessmentPeriod':
        responseData = addAssessmentPeriod(payload);
        break;
      case 'updateAssessment':
        responseData = updateAssessment(payload);
        break;
      case 'uploadFile':
        responseData = uploadFile(payload);
        break;
      default:
        throw new Error("Tindakan tidak valid: " + action);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, data: responseData }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log("Error in doPost: " + err.message + "\nStack: " + err.stack);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: err.message, stack: err.stack }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// =====================================================================================
// FUNGSI API - Pengambilan Data
// =====================================================================================
function getAllData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const users = getSheetData(ss.getSheetByName(SHEET_USERS));
  const wards = getSheetData(ss.getSheetByName(SHEET_WARDS));
  const assessmentPeriods = getSheetData(ss.getSheetByName(SHEET_PERIODS));
  const allAssessmentsRaw = getSheetData(ss.getSheetByName(SHEET_ASSESSMENTS));

  // Proses data penilaian menjadi format yang dibutuhkan frontend
  const allAssessments = {};
  allAssessmentsRaw.forEach(row => {
    if (!row.wardId || !row.poinId) return;

    if (!allAssessments[row.wardId]) {
      allAssessments[row.wardId] = {};
    }

    // Ubah string JSON bukti kembali menjadi objek
    const wardStaffEvidence = row.wardStaffEvidence ? JSON.parse(row.wardStaffEvidence) : null;
    const assessorEvidence = row.assessorEvidence ? JSON.parse(row.assessorEvidence) : null;
    
    // Konversi skor dari string ke angka atau null
    const parseScore = (score) => (score !== "" && !isNaN(score)) ? Number(score) : null;


    allAssessments[row.wardId][row.poinId] = {
      wardStaff: {
        score: parseScore(row.wardStaffScore),
        notes: row.wardStaffNotes || "",
        evidence: wardStaffEvidence
      },
      assessor: {
        score: parseScore(row.assessorScore),
        notes: row.assessorNotes || "",
        evidence: assessorEvidence,
        assessorId: row.assessorId || null
      }
    };
  });

  return { users, wards, allAssessments, assessmentPeriods };
}


// =====================================================================================
// FUNGSI API - Penambahan Data
// =====================================================================================
function addUser(payload) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_USERS);
  const newRow = [
    payload.id || "user-" + new Date().getTime(),
    payload.name,
    payload.email,
    payload.password,
    payload.role,
    payload.wardId || ""
  ];
  sheet.appendRow(newRow);
  return payload;
}

function addWard(payload) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_WARDS);
  const newId = payload.id || "ward-" + new Date().getTime();
  sheet.appendRow([newId, payload.name]);
  return { id: newId, name: payload.name };
}

function addAssessmentPeriod(payload) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_PERIODS);
  const newId = "period-" + new Date().getTime();
  sheet.appendRow([newId, payload.name, payload.startDate, payload.endDate]);
  return { ...payload, id: newId };
}


// =====================================================================================
// FUNGSI API - Pembaruan Data
// =====================================================================================
function updateAssessment(payload) {
  const { wardId, poinId, role, updates } = payload;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_ASSESSMENTS);
  
  const uniqueId = wardId + "-" + poinId;
  const data = sheet.getDataRange().getValues();
  const headers = data.shift();
  
  const uniqueIdColIndex = headers.indexOf("uniqueId") + 1;
  let rowIndex = -1;

  for (let i = 0; i < data.length; i++) {
    if (data[i][uniqueIdColIndex - 1] === uniqueId) {
      rowIndex = i + 2; // +1 for headers, +1 for 1-based index
      break;
    }
  }

  // Tentukan kolom mana yang akan diperbarui
  const columnsToUpdate = {};
  if (role === 'wardStaff') {
    if (updates.score !== undefined) columnsToUpdate["wardStaffScore"] = updates.score;
    if (updates.notes !== undefined) columnsToUpdate["wardStaffNotes"] = updates.notes;
    if (updates.evidence !== undefined) columnsToUpdate["wardStaffEvidence"] = JSON.stringify(updates.evidence);
  } else if (role === 'assessor') {
    if (updates.score !== undefined) columnsToUpdate["assessorScore"] = updates.score;
    if (updates.notes !== undefined) columnsToUpdate["assessorNotes"] = updates.notes;
    if (updates.evidence !== undefined) columnsToUpdate["assessorEvidence"] = JSON.stringify(updates.evidence);
    if (updates.assessorId !== undefined) columnsToUpdate["assessorId"] = updates.assessorId;
  }

  if (rowIndex !== -1) {
    // Baris ada, perbarui
    for (const key in columnsToUpdate) {
      const colIndex = headers.indexOf(key) + 1;
      if (colIndex > 0) {
        sheet.getRange(rowIndex, colIndex).setValue(columnsToUpdate[key]);
      }
    }
  } else {
    // Baris tidak ada, buat baru
    const newRow = headers.map(header => {
      switch (header) {
        case "uniqueId": return uniqueId;
        case "wardId": return wardId;
        case "poinId": return poinId;
        default: return columnsToUpdate[header] !== undefined ? columnsToUpdate[header] : "";
      }
    });
    sheet.appendRow(newRow);
  }
  
  return { success: true, message: "Penilaian berhasil diperbarui." };
}

// =====================================================================================
// FUNGSI API - Unggah File
// =====================================================================================
function uploadFile(payload) {
  const { fileData, fileName, mimeType } = payload;
  
  const FOLDER_ID = getConfigValue(CONFIG_KEY_DRIVE_FOLDER_ID);
  if (!FOLDER_ID) {
    throw new Error("ID Folder Google Drive tidak dikonfigurasi. Jalankan fungsi 'setup' terlebih dahulu.");
  }
  
  const folder = DriveApp.getFolderById(FOLDER_ID);
  
  const base64Data = fileData.split(',')[1];
  const decodedData = Utilities.base64Decode(base64Data);
  const blob = Utilities.newBlob(decodedData, mimeType, fileName);
  
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW); // Pastikan file dapat diakses publik

  const fileUrl = "https://drive.google.com/uc?export=view&id=" + file.getId();

  return {
    name: file.getName(),
    url: fileUrl,
    type: file.getMimeType(),
    fileId: file.getId()
  };
}

// =====================================================================================
// FUNGSI HELPER
// =====================================================================================
function getSheetData(sheet) {
  if (!sheet || sheet.getLastRow() < 2) {
    return [];
  }
  const range = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn());
  const values = range.getValues();
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  return values.map(row => {
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });
}

function getConfigValue(key) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_CONFIG);
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === key) {
      return data[i][1];
    }
  }
  return null;
}

function setConfigValue(key, value) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_CONFIG);
  const data = sheet.getDataRange().getValues();
  let found = false;
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === key) {
      sheet.getRange(i + 1, 2).setValue(value);
      found = true;
      break;
    }
  }
  if (!found) {
    sheet.appendRow([key, value]);
  }
}
```
