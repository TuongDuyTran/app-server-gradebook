import { express } from "../global_class/application.js";
import Express from "express";
import swaggerUI from "swagger-ui-express";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();

let options = {
    explorer: true,
    swaggerOptions: { urls: JSON.parse(fs.readFileSync("./docs/.apiurls")) }
};
express.use("/doc-json", Express.static('docs'));
express.use("/developer/documentation", swaggerUI.serve, swaggerUI.setup(null,options));