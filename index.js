import express from 'express';
import dotenv from 'dotenv';
import sequelize from './db/sequelize.js';
import userRouter from './routes/userRouter.js';
import excelRouter from './routes/excelUploadRoute.js';
dotenv.config();
import cors from 'cors';
import models from './db/models/index.js';

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

app.use('/api', userRouter);
app.use('/api', excelRouter);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
    // Importing the model above registers it with Sequelize
    // Now sync will create the table for User (and any other imported models)
    await sequelize.sync({ force: true });
    console.log('Tables synced!');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer()
  .then((r) => console.log('App is up and running ...'))
  .catch((err) => console.log(err));
