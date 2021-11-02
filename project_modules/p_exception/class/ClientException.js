let IException = require('./IException');

class ClientException extends IException{
    constructor(message) {
        super();
        this.message = message;
        this.code = 400;
    }
}

module.exports = ClientException;