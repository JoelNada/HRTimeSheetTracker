import ExcelUploadLog from '../db/models/ExcelUploadLog.js';
import fs from 'fs';
import { processNormalizedEmployeeExcel } from '../services/empExcelUploadService.js';

const uploadEmployeeController = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file uploaded.' });

  const log = await ExcelUploadLog.create({
    originalName: file.originalname,
    storedPath: file.path,
    uploadType: 'employees',
    status: 'pending',
  });

  try {
    const result = await processNormalizedEmployeeExcel(file.path);

    // If nothing was imported, treat it as a failed/invalid upload
    if (result.imported === 0) {
      await log.update({
        status: 'failed',
        message: `No rows were imported. Skipped: ${result.skipped}`,
      });

      fs.unlinkSync(file.path);
      return res.status(422).json({
        error: 'Upload failed — all rows were skipped.',
        ...result,
      });
    }

    await log.update({
      status: 'success',
      message: `Imported: ${result.imported}, Skipped: ${result.skipped}`,
    });

    fs.unlinkSync(file.path);
    return res.status(200).json({
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

export { uploadEmployeeController };
