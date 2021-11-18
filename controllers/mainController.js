const apiCall = require('../API/axieApiCall');
const cellFetch = require('./cellFetch');

const mmrArray = {
  rows: async (range) => {
    try {
      const sheetColumns = ['C', 'D', 'E', 'F', 'G'];
      const rangeLetter = range.charAt(21);
      const letterIndex = sheetColumns.findIndex((letter) =>
        letter === rangeLetter
      );
      const rowLetter = sheetColumns[letterIndex -1];
      let mmrArray = [];
      const dataArray = await apiCall();
      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].success === true) {
          mmrArray.push(dataArray[i].items[1].elo)
        } else{
          const cellId = `Test promedio diario!${rowLetter}${i +3}:${rowLetter}${i +3}`;
          const cell = await cellFetch.copyCell(cellId);
          const value = await cell.data.values[0][0];
          mmrArray.push(value);
        }
      };
      const rows = mmrArray.map((item)=>{
        return [item];
      });
      console.log('rows built');
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = mmrArray;
