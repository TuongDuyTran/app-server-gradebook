const path = require("path");
let logbk = console.log;
const ROOT = path.resolve("./").replace(/\\/g,"/");

function getFileName() {
    const STACK_FUNC_NAME = new RegExp(/\(?(\w+:\/[^:]+):(\d+):(\d+)\)?/);
    let err = new Error();

    Error.captureStackTrace(err);
    let stack = err.stack;

    stack = stack.replace(/\\/g,"/");

    let stacks = stack.split('\n').slice(1);
    let callerInfo = null;
    callerInfo = stacks[2].match(STACK_FUNC_NAME);
    if(callerInfo === null){
        return {
            filename: "null",
            line: 0,
            column: 0,
        };
    }
    return {
        filename: callerInfo[1].substring(callerInfo[1].lastIndexOf("\/")+1),
        line: callerInfo[2],
        column: callerInfo[3],
    };
}

console.log = function log(){
    const callerInfo = getFileName();
    const currentTime = new Date();
    logbk.apply(undefined, [...[`♪`, `${currentTime.getHours().toString().padStart(2,"0")}:${currentTime.getMinutes().toString().padStart(2,"0")}:${currentTime.getSeconds().toString().padStart(2,"0")}.${currentTime.getMilliseconds().toString().padStart(3,"0")}`, "|",callerInfo.filename+":"+callerInfo.line+":"+callerInfo.column, "|"],...arguments]);
};

module.exports = {};