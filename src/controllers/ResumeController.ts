import { Sequelize, DataTypes } from "sequelize";
import BaseController from "../base/BaseController";
import { Response, Request, response } from "express";
import { isBuffer } from "util";
// import { User }  from "../migrations/models/user.js"

// temporary proxies
interface Model{};
class CModel implements Model{};


// connect to db
const sequelize = new Sequelize(
    'neil',
    'neil',
    null,
     {
       host: '127.0.0.1',
       dialect: 'postgres'
     }
   );


// mode struture
const model = {

};

// model binding
const Resume = sequelize.define("Resumes", model);

class ResumeController extends BaseController{
    constructor(){
        super(Resume, sequelize);
    }

    async getAllResumes(req: Request, res: Response){
        this.getAll(req, res);
    }

    /**
     * Creates a new user. A user can either be an applicant or hiring manager
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async createNewResume(req: Request, res: Response){
        res.status(200).jsonp({Message: "NOT IMPLEMENTED YET"});
    }

    /**
     * Modify an existing user by uniques identifier
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async modifyExistingResume(req: Request, res: Response){
        res.status(200).jsonp({Message: "NOT IMPLEMENTED YET"});
    }

    /**
     * Removes an existing user by unique identifier
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async deleteExistingResumeById(req: Request, res: Response){
        res.status(200).jsonp({Message: "NOT IMPLEMENTED YET"});
    }

    /**
     * Locates an existing user by unique identifier
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async findExistingResumeById(req: Request, res: Response){
        res.status(200).jsonp({Message: "NOT IMPLEMENTED YET"});
    }
}

export default new ResumeController;