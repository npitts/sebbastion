import express from 'express';
import { userInfo } from 'os';
const userRouter = express.Router();

//controllers
import UserController from "../controllers/UserController";

// Set the common part of the path for the routes in this router
const base = '/user'

//Routes
userRouter.get(`${base}`, (req, res) => {
    UserController.getAllUsers(req, res);
})

userRouter.post(`${base}`, (req, res) => {
    // todo: add parameter validation
    UserController.createNewUser(req, res);
})

userRouter.put(`${base}/:id`, (req, res) => {
    // todo: add paramter validation
    UserController.modifyExistingUser(req, res);
})

userRouter.delete(`${base}/:id`, (req, res) => {
    // todo: add parameter validation
    UserController.deleteExistingUserById(req, res);
})

userRouter.get(`${base}/:id`, (req, res) => {
    // todo: add parameter validation
    UserController.findExistingUserById(req, res);
})

userRouter.post(`${base}/login`, (req, res) => {
    // todo: add parameter validation
    UserController.login(req, res);
})

userRouter.post(`${base}/:id`, (req, res) => { 
    // todo: add parameter validation
    UserController.logout(req, res);
})

export default userRouter;