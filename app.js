require('dotenv').config();
const spreadsheetController = require('./controllers/spreadsheetController');
const schedule = require('node-schedule');
const express = require("express");
const port = process.env.PORT;

const app = express();

setInterval(() =>{
	console.log("app funcionando")
}, 420000);

const firstColumn = new schedule.RecurrenceRule();
    firstColumn.hour = 23;
    firstColumn.minute = 30;
    firstColumn.tz = 'America/Argentina/Buenos_Aires';

    const columnCopyJob = schedule.scheduleJob(firstColumn, async() =>{
      await spreadsheetController.copyPreviousValues();
    });

const firstRule = new schedule.RecurrenceRule();
    firstRule.hour = 00;
    firstRule.minute = 00;
    firstRule.tz = 'America/Argentina/Buenos_Aires';

    const job1 = schedule.scheduleJob(firstRule, async() =>{
      const range = 'Test promedio diario!D3:D20'
      await spreadsheetController.update(range);
    });

const secondRule = new schedule.RecurrenceRule();
    secondRule.hour = 15;
    secondRule.minute = 00;
    secondRule.tz = 'America/Argentina/Buenos_Aires';

    const job2 = schedule.scheduleJob(secondRule, async() =>{
      const range = 'Test promedio diario!E3:E20'
      await spreadsheetController.update(range);
    });

const thirdRule = new schedule.RecurrenceRule();
    thirdRule.hour = 18;
    thirdRule.minute = 34;
    thirdRule.tz = 'America/Argentina/Buenos_Aires';

    const job3 = schedule.scheduleJob(thirdRule, async() =>{
      const range = 'Test promedio diario!F3:F20'
      await spreadsheetController.update(range);
    });

const fourthRule = new schedule.RecurrenceRule();
    fourthRule.hour = 21;
    fourthRule.minute = 00;
    fourthRule.tz = 'America/Argentina/Buenos_Aires';

    const job4 = schedule.scheduleJob(fourthRule, async() =>{
      const range = 'Test promedio diario!G3:G20'
      await spreadsheetController.update(range);
    });

app.listen(port || 3000, () => {
    console.log('Servidor corriendo en puerto ');
});