import ExcelJS from 'exceljs';
import models from '../db/models/index.js';
import fs from 'fs';

const { Employee, HrTimeSheet } = models;

const getCellValue = (cell) => {
  const val = cell.value;
  if (val === null || val === undefined) return '';

  if (val.richText && Array.isArray(val.richText)) {
    return val.richText.map((rt) => rt.text).join('');
  }

  if (val.text) {
    if (typeof val.text === 'string') return val.text;
    // Optionally, handle nested richText inside val.text
    if (val.text.richText && Array.isArray(val.text.richText)) {
      return val.text.richText.map((rt) => rt.text).join('');
    }
  }

  if (val instanceof Date) {
    return val.toISOString();
  }

  return val.toString();
};

const isRowEmpty = (row, columns) => {
  return columns.every((colIndex) => {
    const cell = row.getCell(colIndex);
    let text = getCellValue(cell);

    if (typeof text !== 'string') {
      text = String(text);
    }

    // Remove all whitespace including invisible characters often introduced by Google Sheets export
    const cleaned = text.replace(/[\s\u00A0\u200B]+/g, '');
    return cleaned === '';
  });
};

const processNormalizedTimeSheetExcel = async (filePath) => {
  const workBook = new ExcelJS.Workbook();
  await workBook.xlsx.readFile(filePath);
  const sheet = workBook.worksheets[0];

  let imported = 0;
  let skipped = 0;

  const columnsToCheck = [1, 2, 3, 4];

  for (let i = 2; i <= sheet.rowCount; i++) {
    const row = sheet.getRow(i);

    if (isRowEmpty(row, columnsToCheck)) {
      continue;
    }

    const employeeId = getCellValue(row.getCell(1));
    const date = getCellValue(row.getCell(2));
    const task = getCellValue(row.getCell(3));
    const hours = parseFloat(getCellValue(row.getCell(4)));

    if (!employeeId || !date || !task || isNaN(hours)) {
      skipped++;
      continue;
    }

    try {
      // Validate employeeId exists
      const employee = await Employee.findByPk(employeeId);
      if (!employee) {
        console.error(
          `❌ Row ${i} skipped: employeeId ${employeeId} not found`,
        );
        skipped++;
        continue;
      }

      // Insert timesheet entry
      await HrTimeSheet.upsert({
        employeeId,
        date,
        task,
        hours,
      });

      imported++;
    } catch (err) {
      console.error(`❌ Row ${i} failed: ${err.message}`);
      skipped++;
    }
  }

  // Update log status

  // Remove file from uploads folder
  fs.unlinkSync(filePath);

  // If all rows skipped → throw error
  if (imported === 0) {
    throw new Error(`Timesheet upload failed — ${skipped} rows skipped.`);
  }

  return { imported, skipped };
};

export default processNormalizedTimeSheetExcel;
