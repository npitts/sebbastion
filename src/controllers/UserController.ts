import { Sequelize, DataTypes } from "sequelize";
import BaseController from "../base/BaseController";
import { Response, Request, response } from "express";
import { fakeUserDB } from "../utils/fakeout"
// import { User }  from "../migrations/models/user.js"

// temporary proxies
interface Model{};
class CModel implements Model{};

// last minute update to suppoert my login paget
// so this work for real..
// in reality this info would be encrypted in some table



// fake scheman - remove this as its too involved

/*
const schema = {
    "route": {
        name: ",",
        method: "",
        params: [{id}]
    }
}
*/
// connect to db
// push this into a glpobal config
// and use env vars to populate settings
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
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    }
};

// model binding -- note: let's export this from a module
const User = sequelize.define("Users", model);

class UserController extends BaseController{
    constructor(){
        super(User, sequelize);
    }

    async getAllUsers(req: Request, res: Response){
        this.getAll(req, res);
    }

    /**
     * Creates a new user. A user can either be an applicant or hiring manager
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async createNewUser(req: Request, res: Response){
        const {email, lastName, firstName, externalUrl, cover_letter, kind} = req.body;

        if(email && lastName && firstName && kind){
            const user = {
                email: email,
                lastName: lastName,
                firstName: firstName,
                externalUrl: externalUrl,
                cover_letter: cover_letter,
                kind: kind
            };
            this.create(req, res, user);
        }else{
            res.status(422).jsonp({Message: "Invalid Request submitted"});
        }
    }

    /**
     * Modify an existing user by uniques identifier
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async modifyExistingUser(req: Request, res: Response){
        res.status(200).jsonp({Message: "NOT IMPLEMENTED YET"});
    }

    /**
     * Removes an existing user by unique identifier
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async deleteExistingUserById(req: Request, res: Response){
        res.status(200).jsonp({Message: "NOT IMPLEMENTED YET"});
    }

    /**
     * Locates an existing user by unique identifier
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async findExistingUserById(req: Request, res: Response){
        res.status(200).jsonp({Message: "NOT IMPLEMENTED YET"});
    }

    async login(req: Request, res: Response){
        const {email, password} = req.body;
        if(email && password){
            const fakeUserDb = new fakeUserDB();
            fakeUserDb.getUser(email, password);
            if(fakeUserDb.exist()){
                const user = {
                    id: fakeUserDb.getUserId(),
                    kind:fakeUserDb.getKind()

                }
                res.status(200).jsonp(user);
            }else{
                res.status(200).jsonp({Message: "user does not exist, sorry"});
            }
        }else{
            // something wrong with user creds
            res.status(200).jsonp({Message: "user does not exist, sorry"});
        }
    }

    async logout(req: Request, res: Response){
        res.status(200).jsonp({Message: "NOT IMPLEMENTED YET"});
    }
}

export default new UserController;