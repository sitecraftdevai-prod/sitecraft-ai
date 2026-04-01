const { google } = require('googleapis');
const path = require('path');
require('dotenv').config();

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

/**
 * Syncs a Mongoose model's data to a Google Sheet.
 * @param {import('mongoose').Model} Model - The Mongoose model to fetch data from.
 * @param {string} spreadsheetId - The ID of the Google Spreadsheet.
 * @param {string} sheetName - The name of the sheet (tab) within the spreadsheet.
 */
async function syncCollectionToSheet(Model, spreadsheetId, sheetName = 'Sheet1') {
  try {
    // 1. Auth with Google
    // Check if the key file path is absolute or relative
    let keyFilePath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (!path.isAbsolute(keyFilePath)) {
      keyFilePath = path.join(__dirname, '..', keyFilePath);
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: SCOPES,
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 2. Fetch data from MongoDB
    const data = await Model.find({}).lean();
    if (!data || data.length === 0) {
      console.log('No data found in MongoDB.');
      return { success: true, message: 'No data found to sync.' };
    }

    // 3. Prepare data for Google Sheets
    // Extract headers from the first object, filter out common internal fields if desired
    const headers = Object.keys(data[0]);
    const values = data.map(item => headers.map(header => {
      const val = item[header];
      if (val === null || val === undefined) return '';
      if (typeof val === 'object') {
        if (val._id) return val._id.toString(); // Handle Mongoose ObjectIds
        return JSON.stringify(val); // Backup for other objects
      }
      return val.toString();
    }));

    const resource = {
      values: [headers, ...values],
    };

    // 4. Update the sheet
    // Clear the existing content first
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: `${sheetName}!A1:Z5000`,
    });

    // Write new values starting from A1
    const result = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: 'RAW',
      resource,
    });

    console.log(`✅ ${result.data.updatedCells} cells updated in Google Sheet.`);
    return { success: true, updatedCells: result.data.updatedCells };
  } catch (error) {
    console.error('❌ Google Sheets Sync Error:', error);
    throw error;
  }
}

module.exports = { syncCollectionToSheet };
