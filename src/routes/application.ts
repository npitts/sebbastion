import express from 'express';
import { userInfo } from 'os';
const userRouter = express.Router();

//controllers
import ApplicationController from "../controllers/ApplicationController";

// Set the common part of the path for the routes in this router
const base = '/application'

//Routes
userRouter.get(`${base}`, (req, res) => {
  ApplicationController.getAllApplications(req, res);
})

/*
userRouter.get(`${base}/info/:status`, (req, res) => { 
  ApplicationController.findExistingApplicationByStatus(req, res);
})
*/

userRouter.get(`${base}/info/:id`, (req, res) => {
  ApplicationController.getAllApplicationInfo(req, res);
})

userRouter.post(`${base}`, (req, res) => { 
  ApplicationController.createNewApplication(req, res);
})

userRouter.put(`${base}/status`, (req, res) => { 
  ApplicationController.modifyExistingApplication(req, res);
})

userRouter.delete(`${base}/:id`, (req, res) => {
  ApplicationController.deleteExistingApplicationById(req, res);
})

userRouter.get(`${base}/:id/status/:status`, (req, res) => { 
  ApplicationController.findExistingApplicationById(req, res);
})

export default userRouter;