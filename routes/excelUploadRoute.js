import express from "express";
import {uploadEmployeeController} from "../controller/excelUploadController.js";
import upload from "../middleware/uploadMidddleware.js";
const appRouter = express.Router();

appRouter.post("/upload-employee", upload.single('file') ,uploadEmployeeController);
//appRouter.post("/upload-timesheet");

export default appRouter;