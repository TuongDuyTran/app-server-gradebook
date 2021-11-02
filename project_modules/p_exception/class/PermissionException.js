let IException = require('./IException');

class PermissionException  extends IException {
    constructor(message){
        super();
        this.message = message;
        this.code = 300;
    }
}

module.exports = PermissionException;