const path = require('path');
const filePath = path.join(__dirname, '../.env');
require('dotenv').config({ path: filePath});
const {google} = require('googleapis');

const cellFetch = {
  copyCell: async (cell) => {
    try {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'google-credentials.json',
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({version: 'v4', auth: client });
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET;

    const getCell = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: cell
    })

    console.log(`cell ${cell} copied`);
    return getCell;   

    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = cellFetch;