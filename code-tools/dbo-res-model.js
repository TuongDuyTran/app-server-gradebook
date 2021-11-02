import {get_cache} from "./dboCache.js";
import fs from "fs";

const _ROOT = process.cwd();

function choiceInput() {
    return new Promise(resolve => {
        process.stdin.resume();
        process.stdin.once('data', choice => {
            resolve(choice.toString());
        });
    })
}

(async () => {
    try {
        const modelName = process.argv[3];
        const cache = get_cache();
        const cacheItem = cache[modelName];
        if(cacheItem === undefined){
            console.error("FAIL: Model not found");
            process.exit();
        }
        let modelPath = cacheItem[0];

        if (cacheItem.length > 1) {
            console.log("Select your model to be add:");
            for (let i = 0; i < cacheItem.length; i++) {
                console.log(`${(i + 1)}. ${cacheItem[i]}`)
            }
            process.stdout.write(`Type [1-${cacheItem.length}]: `);

            let index = await choiceInput();
            process.stdin.end();

            modelPath = cacheItem[parseInt(index.toString())-1];
            console.log(`${modelPath} is selected`);
        }
        let seedFile = '';
        if (fs.existsSync(`${_ROOT}/dboseeds/seeds.js`)) {
            seedFile = fs.readFileSync(`${_ROOT}/dboseeds/seeds.js`, 'utf-8');
        }
        let models = [...seedFile.matchAll(/import [\"\'](.+)[\"\'](?=;)/g)];
        models = models.map(function (e) {
            return e[1];
        });

        if (!models.includes(modelPath)) {
            models.push(modelPath);
        }
        models = models.map(function (e) {
            return `import "${e}";`;
        });
        seedFile = models.join("\n");
        fs.writeFileSync(`${_ROOT}/dboseeds/seeds.js`, seedFile);
        console.log('SUCCESS');
        process.exit();
    } catch (e) {
        console.error(e);
        process.exit();
    }
})();