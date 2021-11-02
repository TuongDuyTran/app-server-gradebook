import fs from "fs";
import * as sequelize from "sequelize";
import {store_cache} from "./dboCache.js";

const config = JSON.parse(fs.readFileSync("./code-tools/config.JSON", 'utf-8'));
const filePath = process.argv[2];
const dirPath = filePath.substring(0, filePath.lastIndexOf('\\'));
const fileName = filePath.substring(filePath.lastIndexOf('\\')+1);
const desFileName = fileName.substring(0, fileName.indexOf('.'));
let fileContent = fs.readFileSync(filePath, 'utf-8');

let imports = [];
if(/(import ?[^;]* ?from ?\"[^;]*\";)/g.test(fileContent)) {
    imports = [...fileContent.match(/(import ?[^;]* ?from ?\"[^;]*\";)/g)];
}
fileContent = fileContent.replace(/(import ?[^;]* ?from ?\"[^;]*\";)/g, '');
fileContent = fileContent.replace(/^(\r\n)+|\r+|\n+|\t+$/gm, '');

fileContent = fileContent.substring("const ".length);
const modelName = fileContent.substring(0, fileContent.indexOf('=')).trim();
fileContent = fileContent.substring(fileContent.indexOf('=')+1);
fileContent = fileContent.replace(/(DataTypes\.\w+(\([\s\w,]*\))?)(?=,)/g, `"$1"`);
fileContent = fileContent.replace(/([a-zA-Z0-9]+) ?: ?/g, `"$1": `);
fileContent = fileContent.substring(0, fileContent.length-1);

let modelConvert = null;
eval(`modelConvert = ${fileContent}`);

let modelString = JSON.stringify(modelConvert.tableInfo);
modelString = modelString.replace(/(")(DataTypes\.\w+(\([\s\w,]*\))?)(")(?=,)/g, `$2`);
console.log(modelConvert);
let relationship = modelConvert.relationship === undefined ? '' : modelConvert.relationship.toString();
relationship = relationship.slice(relationship.indexOf("{") + 1, relationship.lastIndexOf("}"));
relationship = relationship.replace(/this/g, `dbo.${modelName}`);
relationship = relationship.replace(/(\t+|[ ]{2,})/g, "\n$1");
console.log(modelConvert.tableInfo.__proto__);

let exportModel = [];
for (let name in modelConvert.tableInfo){
    exportModel.push(`${name}: "${name}"`);
}

const template = `import DBO from "dbo";
const {dbo} = DBO;
${imports.join("\n")}

if(dbo.${modelName} === undefined ){
    dbo.${modelName} = DBO.define("${modelConvert.tableName}", ${modelString}, {
        timestamps: false
    });
    ${relationship}
}
const ${desFileName} = {${exportModel.join(",")}};
export default ${desFileName};`;

fs.writeFileSync(`${dirPath}/${desFileName}.js`, template);
store_cache(`${dirPath}/${desFileName}.js`);

let indexFile = '';
if (fs.existsSync(`${dirPath}/index.js`)) {
    indexFile = fs.readFileSync(`${dirPath}/index.js`, 'utf-8');
}
let models = [...indexFile.matchAll(/as ?(.+)(?=})/g)];
models = models.map(function (e) {
    return e[1];
});

if (!models.includes(desFileName)) {
    models.push(desFileName);
}

models = models.map(function (e) {
    return `export {default as ${e}} from "./${e}.js";`;
});

indexFile = models.join("\n");

fs.writeFileSync(`${dirPath}/index.js`, indexFile);