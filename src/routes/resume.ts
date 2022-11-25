import express from 'express';
import { userInfo } from 'os';
const userRouter = express.Router();

//controllers
import ResumeController from "../controllers/ResumeController";

// Set the common part of the path for the routes in this router
const base = '/resume'

//Routes
userRouter.get(`${base}`, (req, res) => {
    ResumeController.getAllResumes(req, res);
})

userRouter.post(`${base}`, (req, res) => { 
    ResumeController.createNewResume(req, res);
})

userRouter.put(`${base}/:id`, (req, res) => { 
    ResumeController.modifyExistingResume(req, res);
})

userRouter.delete(`${base}/:id`, (req, res) => {
    ResumeController.deleteExistingResumeById(req, res);
})

userRouter.get(`${base}/:id`, (req, res) => { 
    ResumeController.findExistingResumeById(req, res);
})

export default userRouter;