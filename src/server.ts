// import main app server module
import App from './other/app'

// imported route modules
import routerJobs from "./routes/job";
import routerResume from "./routes/resume";
import routerApplication from "./routes/application";
import routerUser from "./routes/user";

const port = ( false ) ? '' : "8080";

// configure app server
const app = new App(
    port,
    [
        routerUser, 
        routerJobs, 
        routerResume, 
        routerApplication
    ],
    null,
);

// start server
app.start();