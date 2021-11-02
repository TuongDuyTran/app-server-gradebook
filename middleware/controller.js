import { Validator } from "../global_class/abstractValidator.js";
import "../global_class/validatorHelper.js";
import { ServerException, IException, ClientException } from "p_exception";
import Multer from "multer";
import log4js from "log4js";

let log = log4js.getLogger("api");

function _doValidation(req, res, next) {
    log.info(req.url);
    req.method === "GET" ? log.info(req.query) : log.info(req.body);
    if (this !== null) {
        let inputParams = [];
        for (let i = 0; i < this.length; i++) {
            let param = this[i].split(' ');
            param = {
                reqType: param[0],
                name: param[2],
                dataType: param[1],
                options: param[3]
            };
            let value = (['files'].includes(param.reqType) ? req[param.reqType] : req[param.reqType][param.name]);
            let validator = Validator.get(param.dataType, value, param.options);

            if (validator.valid()) {
                inputParams.push(validator.value);
            } else {
                let error = new ClientException(`Invalid parameter, ${validator.error}. Param '${param.name}'`);
                log.error(error);
                res.status(error.code).json(error);
                res.end();
                return;
            }
        }
        req.inputParams = inputParams;
    }
    next();
}

async function _executeHandler(req, res, next) {
    let result = {};
    try {
        result = await this.apply({ req, res, next }, req.inputParams);

        if (result instanceof IException) {
            log.error(result);
            res.status(result.code).json(result);
        } else {
            log.info({ success: true });
            res.status(200).send({ code: 200, success: true, message: 'OK', data: result });
        }
    } catch (e) {
        log.error(e.message);
        res.status(500).json(new ServerException(e.message));
    }
}

export function handler(func) {
    return _executeHandler.bind(func);
}

export function validate(params) {
    return _doValidation.bind(params);
}

export let multer = Multer({
    storage: Multer.memoryStorage()
});