import ExcelJS from 'exceljs';
import models from '../db/models/index.js';

const { Employee, Department, Role, Manager } = models;

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

export const processNormalizedEmployeeExcel = async (filePath) => {
  const workBook = new ExcelJS.Workbook();
  await workBook.xlsx.readFile(filePath);
  const sheet = workBook.worksheets[0];

  let imported = 0;
  let skipped = 0;

  const columnsToCheck = [1, 2, 3, 4, 5, 6, 7];

  for (let i = 2; i <= sheet.rowCount; i++) {
    const row = sheet.getRow(i);

    if (isRowEmpty(row, columnsToCheck)) {
      continue;
    }
    const employeeId = getCellValue(row.getCell(1));
    const name = getCellValue(row.getCell(2));
    const email = getCellValue(row.getCell(3));
    const departmentName = getCellValue(row.getCell(4));
    const roleTitle = getCellValue(row.getCell(5));
    const managerName = getCellValue(row.getCell(6));
    const managerEmail = getCellValue(row.getCell(7));
    const doj = row.getCell(8);

    if (!name || !email) {
      skipped++;
      continue;
    }

    try {
      const [department] = await Department.findOrCreate({
        where: { name: departmentName },
      });
      const [role] = await Role.findOrCreate({ where: { title: roleTitle } });
      const [manager] = await Manager.findOrCreate({
        where: { email: managerEmail },
        defaults: { name: managerName },
      });

      await Employee.findOrCreate({
        where: { employeeId },
        defaults: {
          name,
          email,
          doj,
          departmentId: department.departmentId,
          roleId: role.roleId,
          managerId: manager.managerId,
        },
      });

      imported++;
    } catch (error) {
      console.error(`❌ Row ${i} failed: ${error.message}`);
      skipped++;
    }
  }

  return { imported, skipped };
};
