import { Response, Request } from "express";
import {Sequelize, DateDataType, SearchPathable , QueryTypes} from 'sequelize';
import { trimSingleQuotes } from "tslint/lib/utils";
import ApplicationController from "../controllers/ApplicationController";

export default class BaseController{
    // private Model: Model;
    private Resource: any;
    private Engine: Sequelize;

    constructor(model: any, engine: Sequelize){
        this.Resource = model;
        this.Engine = engine;

       // todo: not a good place for this as it creates too many db handles
        this._getAccessorEngine().authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch((error: any) => {
            console.error('Unable to connect to the database: ', error);
        });
    }

    private createApplication(data: {dataValues: any, role: "Engineering Role"}){
        this._getAccessorEngine().query(
            'INSERT INTO "Applications" (user_id, job_id, status, "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?)',
            {

              // using default va;lues for the demo
              // for real, these woule be selected by the user
              // in the app and dynamically passed in
              replacements: [`${data.dataValues.id}`,"Engineering Role", 
              "Pending Review", '2020-06-22 19:10:25-07', 
              '2020-06-22 19:10:25-07'],
              type: QueryTypes.INSERT
            }
        ).then(model => {
            console.log(model);
            // this.jsonRes(model, res);
        }).catch((error) => {
            console.error('Failed to get data : ', error);
            // this.errRes(error, res, "Critical Server Error");
        });
    }

    protected create(req: Request, res: Response, entity: any){
        this._getAccessorEngine().sync().then(() => {
            this.Resource.create(entity).then((model: any) => {

                // todo: may not here but will need to also create the applicatio tied to the applicant(user)
                this.createApplication(model);

                this.jsonRes(model, res);
            }).catch((error: any) => {
                console.error('Failed to create a new record : ', error);
                this.errRes(error, res, "Critical Server Error");
            });
         
         }).catch((error) => {
            console.error('Unable to create table : ', error);
            this.errRes(error, res, "Critical Server Error");
         });
    }

    /**
     * Modifying a resource
     * 
     */
    protected async Modify(req: Request, res: Response, data: any){
        await this.Resource.update(
            { status: data.status },
            {
              where: {
                id: [data.id],
              },
            }
          );
        }

    protected getAll(req: Request, res: Response) {
        this._getAccessorEngine().sync().then(() => {
            this.Resource.findAll().then((model: any) => {
                this.jsonRes(model, res);
            }).catch((error: any) => {
                this.errRes(error, res, "Critical Server Error");
            });
        
        }).catch((error: any) => {
            this.errRes(error, res, "Critical Server Error");
        });
    }
    /**
   * Sends the document as JSON in the body of response, and sets status to 200
   * 
   * @param data data that is send back in the response
   * @param res the response object that will be used to send http response
   */
    protected jsonRes(data: any, res: Response) {
        res.status(200).json(data);
    }
  
  /**
   * Provides a simple, standardized way of responding to errors. Includes err object in response if env().stage  is 'dev'
   * 
   * @param err error object of any type genereated by the system
   * @param message custom response message to be provided to the client in a JSON body response ({error:'message'})
   * @param res response object to be used to to send
   * @param status custom status code, defaults to 500
   */
   protected errRes(err: any, res: Response, message:string = "Server Error", status:number = 500) {
    if (process.env.ENV === "dev") {
      res.status(status).json({ error: message, err });
    } else {
      res.status(status).json({ error: message });
    }
  }

    /**
     * Deletes resource  specified 
     * 
     * @param res 
     * @param req 
     * @param errMsg 
     */
    protected deleteById(req: Request, res: Response, id: string) {
        this._getAccessorEngine().sync().then(() => {

            this.Resource.destroy({
                where: {
                  id: `${id}`
                }
            }).then(() => {
                console.log("Successfully deleted record.")
            }).catch((error: any) => {
                console.error('Failed to delete record : ', error);
            });
          
          }).catch((error) => {
              console.error('Unable to create table : ', error);
          });
    }

/**
 * Locate  resource by specified id
 * 
 * @param res 
 * @param req 
 * @param errMsg 
 */
protected findById(req: Request, res: Response, id: string, status: string) {
    this._getAccessorEngine().sync().then(() => {

        this.Resource.findOne({
            where: {
                id : `${id}`,
                status: `${status}`
            }
        }).then((model: any) => {
            // todo: check for null
            if(model === null){
                // error
            }
            console.log(res);
            this.jsonRes(model, res);
        }).catch((error: any) => {
            console.error('Failed to retrieve data : ', error);
            this.errRes(error, res, "Critical Server Error");
        });
    
    }).catch((error) => {
        console.error('Unable to create table : ', error);
        this.errRes(error, res, "Critical Server Error");
    });
}

protected getAppInfoByUserId(req: Request, res: Response, data: {id: any}){
    this._getAccessorEngine().query(
        'SELECT * FROM "Users", "Applications" WHERE "Users".id = ? and "Applications".user_id = ?',
        {
          replacements: [`${data.id}`,`${data.id}`],
          type: QueryTypes.SELECT
        }
    ).then(model => {
        console.log(model);
        this.jsonRes(model, res);
    }).catch((error) => {
        console.error('Failed to get data : ', error);
        this.errRes(error, res, "Critical Server Error");
    });
}

  /**
   * Returns the data accessor linked to this controller
   * 
   * @returns 
   */
  private _getAccessorEngine() {
    return this.Engine;
  }
}