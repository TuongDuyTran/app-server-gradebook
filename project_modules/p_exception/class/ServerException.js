let IException = require('./IException');

class ServerException  extends IException {
    constructor(message){
        super();
        this.message = message;
        this.code = 500;
    }
}

module.exports = ServerException;