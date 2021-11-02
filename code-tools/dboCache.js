import fs from "fs";

const _ROOT = process.cwd();
import path from "path";


export const store_cache = function(filePath){
    let relPath = ".."+filePath.substring(_ROOT.length);
    relPath = relPath.replace(/\\/g, "/");
    let extension = path.extname(filePath);
    let fileName = path.basename(filePath,extension);
    let modelcache = '{}';
    if(fs.existsSync("./code-tools/.cache/model.cache")) {
        modelcache = fs.readFileSync("./code-tools/.cache/model.cache", 'utf-8');
    }
    modelcache = JSON.parse(modelcache);

    modelcache[fileName] =  modelcache[fileName] || [];
    if(!modelcache[fileName].includes(relPath)){
        modelcache[fileName].push(relPath);
    }

    fs.writeFileSync("./code-tools/.cache/model.cache", JSON.stringify(modelcache));
};

export const get_cache = function(filePath){
    let modelcache = '{}';
    if(fs.existsSync("./code-tools/.cache/model.cache")) {
        modelcache = fs.readFileSync("./code-tools/.cache/model.cache", 'utf-8');
    }
    return JSON.parse(modelcache);
};