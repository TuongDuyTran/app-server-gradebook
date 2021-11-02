process.env.TZ = 'Asia/Ho_Chi_Minh';
import Express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import Authentication from "../authentication/Authentication.js";
// import log4js from "log4js";

export const express = Express();
dotenv.config();
// log4js.configure("log4js.json");

//Express setting
express.set('views', path.join(path.resolve(), 'views'));
express.set('view engine', 'ejs');
express.disable('x-powered-by');
express.set('trust proxy', 1);
express.use(bodyParser.json());
express.use(bodyParser.urlencoded({ extended: true }));
// express.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

express.get('/', (req, res) => {
    res.send({ message: "Welcome to grade book backend" });
});

express.get('/module-control', (req, res) => {
    res.render('module-control/index');
});

// const indexPath = path.resolve("./docs/.apilist");
// fs.writeFileSync(indexPath, '');

// function addToSwaggerDocs(controllerPath) {
//     controllerPath = controllerPath.replace("..", ".");
//     controllerPath = path.resolve(controllerPath);
//     return new Promise(function (resolve, reject) {
//         let fileData = fs.readFileSync(indexPath, 'utf8');
//         let apiList = fileData.split("\n");
//         if (Array.isArray(apiList) && apiList[0] === "") {
//             apiList.splice(0, 1);
//         }
//         if (!apiList.includes(this.filePath)) {
//             apiList.push(this.filePath);
//         }
//         apiList = apiList.join("\n");
//         fs.writeFileSync(indexPath, apiList);
//         resolve(true);
//     }.bind({ filePath: controllerPath }));
// }

class Application {
    useController(controllerPath) {
        //addToSwaggerDocs(controllerPath);
        return import(controllerPath).then((module) => {
            Promise.resolve(module);
        });
    }

    start() {
        return express.listen(process.env.PORT, () => {
            console.log(`The Application is running on port ${process.env.PORT}`);
        });
    };
}
export default new Application();
