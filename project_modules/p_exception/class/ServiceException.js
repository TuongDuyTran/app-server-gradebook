let IException = require('./IException');

class ServiceException extends IException {
    constructor(message){
        super();
        this.message = message;
        this.code = 600;
    }
}

module.exports = ServiceException;