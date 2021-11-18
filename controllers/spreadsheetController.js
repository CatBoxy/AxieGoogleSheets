const path = require('path');
const filePath = path.join(__dirname, '../.env');
require('dotenv').config({ path: filePath});

const {google} = require('googleapis');
const mmrArray = require('./mainController');

const spreadsheetController = {
  update: async (range) => {
    try {
    const googleRows = await mmrArray.rows(range);

    const auth = new google.auth.GoogleAuth({
      keyFile: 'credentials.json',
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({version: 'v4', auth: client });
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET;

    await googleSheets.spreadsheets.values.clear({
      auth,
      spreadsheetId,
      range: range,
    });

    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: await googleRows,
      }
    });
    console.log('spreadsheet updated');

    } catch (error) {
      console.log(error);
    }
  },

  copyPreviousValues: async () => {
    try {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'credentials.json',
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({version: 'v4', auth: client });
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET;

    await googleSheets.spreadsheets.values.clear({
      auth,
      spreadsheetId,
      range: 'Test promedio diario!C3:C20',
    });

    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'Test promedio diario!G3:G20'
    })

    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: 'Test promedio diario!C3:C20',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: await getRows.data.values,
      }
    });
    console.log('spreadsheet first column updated');

    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = spreadsheetController;