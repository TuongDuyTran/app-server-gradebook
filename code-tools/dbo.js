import fs from 'fs';
import 'mustlog';
const action = process.argv[2];

if(fs.existsSync(`./code-tools/dbo-${action}.js`)){
    import(`./dbo-${action}.js`);
} else {
    console.log(`Action is not found
    
    Action list:
    - migrate
    `);
}