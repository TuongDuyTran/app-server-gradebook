import path from 'path';
import fs from "fs";
import { store_cache } from "./dboCache.js";

const _ROOT = process.cwd();
const _DIR = process.env.INIT_CWD;
try {
    const modelName = process.argv[3];
    const tableName = process.argv[4] ? process.argv[4] : modelName;
    let modelTemplate = fs.readFileSync("./code-tools/.tml/model.tml", 'utf-8');
    modelTemplate = modelTemplate.replace(/{MODEL_NAME}/g, modelName);
    modelTemplate = modelTemplate.replace(/{TABLE_NAME}/g, tableName);

    fs.writeFileSync(`${_DIR}/${modelName}.dbo.js`, modelTemplate);
    store_cache(`${_DIR}/${modelName}.js`);
    let indexFile = '';
    if (fs.existsSync(`${_DIR}/index.js`)) {
        indexFile = fs.readFileSync(`${_DIR}/index.js`, 'utf-8');
    }
    let models = [...indexFile.matchAll(/as ?(.+)(?=})/g)];
    models = models.map(function (e) {
        return e[1];
    });

    if (!models.includes(modelName)) {
        models.push(modelName);
    }

    models = models.map(function (e) {
        return `export {default as ${e}} from "./${e}.js";`;
    });

    indexFile = models.join("\n");

    fs.writeFileSync(`${_DIR}/index.js`, indexFile);

    console.log("Model create successfully");
    console.log(`DBO file: ${_DIR}\\${modelName}.dbo.js`);
    console.log(`Model file: ${_DIR}\\${modelName}.js`);
} catch (e) {
    console.error(e);
}