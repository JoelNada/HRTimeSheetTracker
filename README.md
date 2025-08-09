# HR Timesheet Management System

A full-stack web application to manage employee timesheets, roles, departments, and managers — built with Node.js, Express, Sequelize, PostgreSQL, and ExcelJS for Excel file uploads.

---

## Features

### User Management & Authentication
- User registration and login
- Role-based access control (e.g., admin, employee, manager)
- Secure authentication using JWT or session-based strategies

### Employee Management
- CRUD operations for employees
- Assign employees to departments, roles, and managers
- Upload employee data via Excel files (.xlsx) with rich text and formatting support

### Timesheet Management
- Upload weekly timesheets via Excel files
- Prevent duplicate entries using composite unique keys `(employeeId, date, task)`
- Automatic insert or update of records on upload (`upsert` logic)
- Validation and skipping of empty or invalid rows
- History of timesheet uploads with logging and status tracking

### Data Relationships
- Employee belongs to Department, Role, and Manager
- Timesheets belong to Employees
- Manager manages multiple employees

### Statistics & Reporting
- Aggregate total hours per employee, department, or role
- Filter reports by date ranges (weekly, monthly, custom)
- Export reports to Excel or CSV (planned feature)
- Dashboard views for management to monitor workloads and productivity

### Tech Stack
- Backend: Node.js, Express.js
- Database: PostgreSQL with Sequelize ORM
- Excel handling: ExcelJS for parsing and generating `.xlsx` files
- Authentication: JWT or Passport.js (configurable)
- Frontend: React.js (planned/optional)
- Deployment: Docker-ready setup (optional)

---

## Installation

1. Clone the repository

```bash
git clone -b main https://github.com/JoelNada/HRTimeSheetTracker-api.git
cd HRTimeSheetTracker-api
npm install
```
and 
```bash 
npm start  
``` to run the application

---

## Usage
### Uploading Employee Data
-Use the /upload/employees endpoint to upload Excel files (.xlsx).
-The file should contain employee details with columns matching your model fields.
-Rich text formatting in Excel cells is supported and handled programmatically.

### Uploading Timesheets
-Use the /upload/timesheets endpoint to upload weekly timesheets.
-Duplicate entries for the same (employeeId, date, task) update the existing record.
-Empty rows or invalid data are skipped and logged.

### Authentication & Roles
-Register and login to receive access tokens.
-API routes are protected by role-based middleware.
-Admin users can manage employees, roles, departments, and view reports.
-Employees submit their timesheet data offline (e.g., Excel files) which are then uploaded by authorized personnel.

### Generating Reports
-API endpoints support filtering and grouping by employee, department, role, and date ranges.
-Aggregated statistics (total hours worked, average hours, etc.) are available for management.
