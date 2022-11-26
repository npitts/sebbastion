import { Sequelize, DataTypes } from "sequelize";
import BaseController from "../base/BaseController";
import { Response, Request, response } from "express";
import { isBuffer } from "util";
// import { User }  from "../migrations/models/user.js"

// temporary proxies
interface Model{};
class CModel implements Model{};


// connect to db
// todo: put tthis in a global congfig
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
    user_id: {
        type: DataTypes.STRING,
    },
    job_id: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
    }
};

// model binding
const Application = sequelize.define("Applications", model, {
    freezeTableName: true
});

class ApplicationController extends BaseController{
    constructor(){
        super(Application, sequelize);
    }

    async getAllApplications(req: Request, res: Response){
        this.getAll(req, res);
    }

    async getAllApplicationInfo(req: Request, res: Response){
        const {id} = req.params;
        this.getAllAppInfo(req, res);
    }

    /**
     * Creates a new user. A user can either be an applicant or hiring manager
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async createNewApplication(req: Request, res: Response){
        const {id} = req.body;

        if(id){
            const user = {
                user_id: `${id}`,
                job_id: "Sotware Engineer", // hard coding for testing purposes
                status: "Pending Review" // hardcoding for testing purposes
            };

            this.create(req, res, user);
         }
    }

    /**
     * Modify an existing user by uniques identifier
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async modifyExistingApplication(req: Request, res: Response){
        const { status, id } = req.body;
        let data = {
            id: id,
            status: status
        };
        this.Modify(req, res, data);
    }

    /**
     * Removes an existing user by unique identifier
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async deleteExistingApplicationById(req: Request, res: Response){
        res.status(200).jsonp({Message: "NOT IMPLEMENTED YET"});
    }

    /**
     * Locates an existing user by unique identifier
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async findExistingApplicationById(req: Request, res: Response){
        const {id, status} = req.params;
        this.findById(req, res, id, status);
    }

    /*
    async findExistingApplicationByUser(req: Request, res: Response){
        const {id, status} = req.params;
        this.findByUserId(req, res, id, status);
        // res.status(200).jsonp({Message: "NOT IMPLEMENTED YET"});
    }
    */
}

export default new ApplicationController;