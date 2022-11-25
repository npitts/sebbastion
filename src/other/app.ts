// import { env } from "./environment/env";
import { Application } from "express";
import express = require("express");
// import mongoose = require("mongoose");
import bodyParser from 'body-parser';
import url from 'url';
import querystring from 'querystring';
import cors from "cors";

export default class App {
    public app: Application;

    private port: string;
    private pathVersion = 1;
    private apiRootPath: string;

    constructor(port: string, routes: Array<express.Router>, middleware: Array<any>) {
        // do stuff
        this.port = port;
        // this.apiPath = apiRootPath ? apiRootPath : `/v${this.pathVersion}/api`;
        this.apiRootPath = "/api";

        //* Create a new express app
        this.app = express();

        // this.middleWare(middleware);

        //todo: abstract this out of here so it more elegantly configurable
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        // temp add for cors
        this.app.use(cors({
            origin: 'http://localhost:3000'
        }));
        
        //* Method calls `this.app.use()` for each middleware
        // this.middleWare(middleware);
        
        //* Method calls `this.app.use()` for each router, prepending `this.apiPath` to each router
        this.registerRoutes(routes);
    }

    /**
     * Reigister routes
     * 
     * @param routes 
     */
    registerRoutes(routes: Array<express.Router>){
        routes.forEach((r) => {
            this.app.use(`${this.apiRootPath}`, r);
        });
    }

    /**
     * Might not need this, remove it
     * 
     * @param middleware 
     */
    middleWare(middleware: Array<any>){}

    start(){
        console.log(`logging port ${this.port}`);
        this.app.listen(this.port, function(){
            console.log(`new applicant tracking system started on port ${this.port}`)
        });
    }
}