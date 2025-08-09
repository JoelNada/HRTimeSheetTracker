import express from 'express';
import upload from '../middleware/uploadMidddleware.js';
import { uploadEmployeeController } from '../controller/empExcelUploadController.js';
import { uploadTimesheetController } from '../controller/timSeehtExcelUploadController.js';

const appRouter = express.Router();

appRouter.post(
  '/upload-employee',
  upload.single('file'),
  uploadEmployeeController,
);
appRouter.post(
  '/upload-timesheet',
  upload.single('file'),
  uploadTimesheetController,
);

export default appRouter;
