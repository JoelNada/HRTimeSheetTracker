import ExcelJS from "exceljs";
import models from "../db/models/index.js";

const { Employee, Department, Role, Manager } = models;

export const processNormalizedEmployeeExcel = async (filePath) => {
  const workBook = new ExcelJS.Workbook();
  await workBook.xlsx.readFile(filePath);
  const sheet = workBook.worksheets[0];

  let imported = 0;
  let skipped = 0;

  for (let i = 2; i <= sheet.rowCount; i++) {
    const row = sheet.getRow(i);
    const employeeId = row.getCell(1).value;
    const name = row.getCell(2).value;
    const email = row.getCell(3).value;
    const departmentName = row.getCell(4).value;
    const roleTitle = row.getCell(5).value;
    const managerName = row.getCell(6).value;
    const managerEmail = row.getCell(7).value;
    const doj = row.getCell(8).value;

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

