import ExcelUploadLog from '../db/models/ExcelUploadLog.js';
import processNormalizedTimeSheetExcel from '../services/timeSheetExcelUploadService.js';
import fs from 'fs';

const uploadTimesheetController = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file uploaded.' });

  const log = await ExcelUploadLog.create({
    originalName: file.originalname,
    storedPath: file.path,
    uploadType: 'timesheets',
    status: 'pending',
  });

  try {
    const result = await processNormalizedTimeSheetExcel(file.path);
    await log.update({
      status: 'success',
      message: `Imported: ${result.imported}, Skipped: ${result.skipped}`,
    });
    //fs.unlinkSync(file.path); // cleanup
    res.json({
      message: 'Upload successful.',
      ...result,
    });
  } catch (error) {
    await log.update({
      status: 'failed',
      message: error.message,
    });

    res
      .status(500)
      .json({ error: 'Failed to process Excel file.', detail: error.message });
  }
};

export { uploadTimesheetController };
