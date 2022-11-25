import express from 'express';
const userRouter = express.Router();

//controllers
import JobController from "../controllers/JobController";

// Set the common part of the path for the routes in this router
const base = '/job'

//Routes
userRouter.get(`${base}`, (req, res) => {
    JobController.getAllJobs(req, res);
})

userRouter.post(`${base}`, (req, res) => { 
    JobController.createNewJob(req, res);
})

userRouter.put(`${base}/:id`, (req, res) => { 
    JobController.modifyExistingJob(req, res);
})

userRouter.delete(`${base}/:id`, (req, res) => {
    JobController.deleteExistingJobById(req, res);
})

userRouter.get(`${base}/:id`, (req, res) => { 
    JobController.findExistingJobById(req, res);
})

export default userRouter;