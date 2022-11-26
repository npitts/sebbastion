Welcome to Sebbastion. An API service for tracking job applicants. This is the backend for the Jarvis frontend App.

# Disclaimer
Only the routes required are working. There are a few that are not operable and they will return a reponse of 'NOT IMPLEMNTED YET'. Also there may be a few I'e added at the last minute that do not mathc the route below. Please be warned :)

## Context
The implementation I choose is a simple Restful API with a frontend(separate archive) written in React. I choose node on the backend becuase its simple, fast, and scales well. I choose, typescript as oppposed to RAW JS becuase of the strict typing rules that non-scripting(like C++ and Java) languages are use to. This makes enforcing good programming practices easy to do. Also serves well when testing locally or in ci/cd testing pipelines.

Typescript
```
Server can be written in a lot of languages. Typescript sits on top of JS and is a typeing library that can be used to limit any bad practices that can happen when writing in RAW JS.
```

postgres
```
fast, robust, and scalable rdbms solution for storing, and manipluating large sets of data.
```

Sequelize
```
Easy to use library that support multiple concepts. It can be used to interact(queries, inserts etc...) with the data in your solution. Plus in can be used for migrations and seeding the db for testing if you need that. In face, there are a few seeders and instructions in this Readme on how to create the models and seed them so you can test.
```

express
```
node library for writing API. Its light weight and extrememl;y flexible. There are good backend libs out there, like next js. But for this, seemed best to go with express becuase I needed something lighter that has the core of what all of the other fancier(bigger) lib have anyway. Does the job.
```

## todo
```
The following is what I would consider needed for this to make it procduction ready

-- parameter validation
-- route protection -- aka rest authentication using oauth
-- add unit test
-- caching
-- file(resume) upload
-- cloud storage for storing resume files
-- env vars(not included in this test) but production it would be better to store things in secrets and uses a secret manager for protecting zand manager vars
-- test scripts for ci/cd usage
```

## Requirements
Make sure to install these depdencies prior to beginning the setup process.
sequelize
```
library for interacting with any relation model such as postgres, mysql oracle, and sql server
```
postgres
```
rdbms for persisting relational data
```
node v. 16+
```
server side js engine
```
yarn or npm
```
package managers for node
```

## Resources
```
User -- Represents the user profile

```
```
Application -- Represents a job aaplication
```
```
Resume -- Represents an uploaded resume file
```
```
Job -- Represent job listing info
```

## Support Routes
POST /api/user
--- create a new user
GET /user/{id} or GET /user for retrieving all users in the authentoecated tenant
--- Retrieved users info
PUT /user/{id}
--- Updates an existing user
DEL /user/{id}
--- Deletes an existing user

POST /api/application
--- create a new application
GET /api/application/{id} or GET /user for retrieving all users in the authentoecated tenant
--- Retrieved application info
PUT /api/application/{id}
--- Updates an existing application
DEL /api/application/{id}
--- Deletes an existing application

POST /api/job
--- create a new job
GET /api/job/{id} or GET /user for retrieving all users in the authentoecated tenant
--- Retrieved jobs info
PUT /api/job/{id}
--- Updates an existing job
DEL /api/job/{id}
--- Deletes an existing job

POST /api/resume
--- create a new resume
GET /api/resume/{id} or GET /user for retrieving all users in the authentoecated tenant
--- Retrieved resume info
PUT /api/resume/{id}
--- Updates an existing resume
DEL /api/resume/{id}
--- Deletes an existing resume


## Getting Started

```
 -- https://github.com/npitts/sebbastion.git
 -- cd into sebbastion
 -- run npm i or yarn install

```

## Migrations and Seeding
There is a migrations folder @ /src/migrations with the following folder inside. There are migrations and seeders including and you shoould only need to run teh commands listed down below but you may have to do more. Pleasee see the sequeize docs(https://sequelize.org/docs/v6/other-topics/migrations/) for more info.
- config
- models
- seeds
- migrations


First up is creating migrations and seeding the db instance with some test data. For convience, the models have been created. You just need to run the migration script(commamd) and seed the db. Follow these steps
```
If you don't have one, you will need to download and install postgres. to do so:
--- follow the instructions here: https://www.postgresql.org/download/
```

then do: for migrations
```
--- go to project/src/migrations

--- run npx sequelize-cli db:migrate
```

then do: for seeding
```
--- go to project/src/migrations
--- run npx sequelize-cli db:seed:all
```

Please note that in each controller.js, you will find a piece of code that looks like the following and will have to upadte to connect to the data source(postgres):

```
const sequelize = new Sequelize(
    'neil', // Database Name
    'neil', // Datbase Username
    null, // Database Password
     {
       host: '127.0.0.1',
       dialect: 'postgres'
     }
   );
   ```

   when setting up postgres, just name you db neil and you won't have to change anything. also, in a production env, this code wouldn't exist as there would be some sort of glpobal setting so all processes can share. This is just form testing purposes. :)

after running the above, check the db to make sure all of the migrations and seeders have been created.

Please note: (Ran out of time but did plan on moving this into the database)
You will have to create a user(via the seeder step above), the n update (just grab the user id from the users table and update it here) the following code snippet located at src/services/fakeout.ts
```
this.users = [
            {
                id: "15", // replace with the user created
                usermame:"cornelius_pitts@yahoo.com",
                password:"Password123",
                kind: "applicant"
            },
            {
                id: "12", // replace with the user created
                usermame:"george@upwave.com",
                password:"Password123",
                kind: "manager"
            },
        ];
```
the above does some authorization via a login screen that was added early in the assignment and I did a quick fake mock of the data I'd expect to have to get from a db column I hadn't added yet.

## Running it
You can use npm or yarn. Whichever you prefer to start the service

```
from the /folder/sebbastion folder, do yarn or npm start
```

## Links to main libraries to understand

-- `Sequelize`: [Sequelize](https://sequelize.org/docs/v6/other-topics/migrations/)

-- `Postgres`: [Postgres](https://www.postgresql.org/download/)

-- `NodeJS`: [NodeJS](https://nodejs.org/en/)

-- `Typescript`: [Typescript](https://www.typescriptlang.org/)

-- `yarn Bus`: [NATS](https://yarnpkg.com/)

-- `npm`: [npm](https://www.npmjs.com/package/node)

-- `expressJS`: [expressJS](https://expressjs.com/)
