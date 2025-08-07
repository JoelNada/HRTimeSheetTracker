import express from 'express';
import { getUsers, createUser } from '../controller/userController.js';

const appRouter = express.Router();

appRouter.get('/get-users', getUsers);
appRouter.post('/create-users', createUser);
//appRouter.get('/get-userById/:id')

export default appRouter;
