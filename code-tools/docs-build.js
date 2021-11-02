// import fs from "fs";
// import path from "path";
// import dotenv from "dotenv";

// dotenv.config();

// const ROOT = path.resolve(".");

// const controllerRegex = /routes.(?<method>\w+)\(['"](?<path>.+)['"],.*validate\(\[(?<params>[^\]]+)\]\),.*handler\(\w+.(?<business>\w+)/g;
// const baseUrlRegex = /express\.use\(['"](?<baseUrl>.*)['"]/g;
// const importRegex = /import (?<export>.+) from ['"](?<path>.+)['"];/g;
// const functionRegex = /\/\*\*(?<docs>[^\/]+)\*\/\s+(?<async>\w+)? (?<method>\w+)/g;
// const paramRegex = /['"](?<inputtype>[^ ]+) (?<datatype>[^ ]+) (?<name>[^ ]+) ?(?<options>[^ ]+)?['"]/g;

// let apilist = fs.readFileSync(`${ROOT}/docs/.apilist`, "utf8").split("\n");
// let apiUrls = [];

// function getAPIs(apiPath) {
//     let apiContent = fs.readFileSync(apiPath, "utf8");
//     let apiName = apiPath.split("\\");

//     apiName.splice(0,apiName.length-2);
//     apiName[1] = apiName[1].split(".")[0];
//     apiName = apiName.join(" ").toLowerCase()
//         .replace(/ (.)/g, a => a.toUpperCase())
//         .replace(/^(.)/m, a => a.toUpperCase());

//     let apiDocs = JSON.parse(fs.readFileSync(`${ROOT}/docs/swagger.json`, "utf8"));
//     let apiInfo = {
//         name: apiName,
//         components: {},
//         routes: {},
//         tags: [],
//     };
//     let desFile = `${ROOT}/docs/apis/${apiName.replace(/ /g, '')}.json`;

//     [...apiContent.matchAll(controllerRegex)].forEach(getRoutes.bind(apiInfo));

//     let baseUrl = [...apiContent.matchAll(baseUrlRegex)][0];

//     if(Object.values(apiInfo.routes).length > 0 && baseUrl !== undefined) {
//         baseUrl = baseUrl.groups.baseUrl;
//         apiDocs.info.title = apiDocs.info.title.replace(/{ROUTENAME}/g, apiInfo.name);
//         apiDocs.host = process.env.HOST;
//         if (apiInfo.components.schemas) {
//             apiDocs.components = apiInfo.components;
//         }
//         apiDocs.paths = apiInfo.routes;
//         apiDocs.tags = apiInfo.tags;
//         apiDocs.basePath = baseUrl;

//         fs.writeFileSync(desFile, JSON.stringify(apiDocs));
//         apiUrls.push({
//             name: apiInfo.name+' api',
//             url: `/doc-json/apis/${apiName.replace(/ /g, '')}.json`
//         })
//     } else if(fs.existsSync(desFile)) {
//         fs.rmSync(desFile)
//     }
// }

// function getRoutes(match){
//     let routeInfo = {
//         method: match.groups.method?match.groups.method:null,
//         path: match.groups.path?match.groups.path:null,
//         params: match.groups.params?match.groups.params:null,
//         business: match.groups.business?match.groups.business:null,
//     };

//     routeInfo.path = routeInfo.path.replace(/(:(\w+))/g,"{$2}");

//     if(routeInfo.method !== null){
//         let params = [];
//         [...routeInfo.params.matchAll(paramRegex)].forEach(getParams.bind(params));
//         routeInfo.params = params;
//         this.routes = {...this.routes, ...{
//                 [routeInfo.path]: {
//                     [routeInfo.method]: {
//                         summary: "",
//                         description: "",
//                         parameters: routeInfo.params,
//                         responses: {
//                             200: {
//                                 description: ""
//                             }
//                         },

//                     }
//                 }
//             }}
//     }
// }

// const InputType = {
//     body: "body",
//     params: "path",
//     query: "query"
// };

// const AllowType = ["array", "boolean", "integer", "number", "object", "string"];

// function getParams(match){
//     let paramInfo = {
//         inputType: match.groups.inputtype?InputType[match.groups.inputtype]:null,
//         dataType: match.groups.datatype?match.groups.datatype:null,
//         name: match.groups.name?match.groups.name:null,
//         options: match.groups.options?match.groups.options:null,
//     };

//     if(paramInfo.inputType !== null){
//         if(paramInfo.inputType === "body"){
//             let bodyParam = this.find(item => item.in === InputType.body);
//             if(bodyParam === null || bodyParam === undefined){
//                 bodyParam = {
//                     name: InputType.body,
//                     in: InputType.body,
//                     description: "",
//                     schema: {
//                         type: "object",
//                         properties: {}
//                     }
//                 };
//                 this.push(bodyParam);
//             }

//             let newProp = {
//                 [paramInfo.name]: {
//                     type: AllowType.includes(paramInfo.dataType)?paramInfo.dataType:"object"
//                 }
//             };

//             if(paramInfo.dataType === 'array'){
//                 newProp[paramInfo.name].items = {
//                     type: "object"
//                 }
//             }

//             bodyParam.schema.properties = {...bodyParam.schema.properties, ...newProp};
//         } else {
//             let newProp = {
//                 name: paramInfo.name,
//                 in: paramInfo.inputType,
//                 description: "",
//                 type: AllowType.includes(paramInfo.dataType)?paramInfo.dataType:"object"
//             };
//             if(paramInfo.inputType === InputType.params){
//                 newProp.required = true;
//             }
//             this.push(newProp);
//         }
//     }
// }

// apilist.forEach(getAPIs);
// fs.writeFileSync(`${ROOT}/docs/.apiurls`, JSON.stringify(apiUrls));
// console.log("Document build successfully");