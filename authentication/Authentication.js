
import { ServerException } from "p_exception";

class Authentication {
    #listClass = {};
    static #instance = null;

    constructor() {
        this.#listClass = [];
    }

    static getInstance() {
        if (!this.#instance)
            this.#instance = new Authentication();
        return this.#instance;
    }

    async _doAuthen(req, res, next) {
        if (req.headers['authorization'] === process.env.SecretKey) {
            let importAuth = await import(`../authentication/${this}/auth.js`);
            if (await importAuth.default.authen(req))
                return next();
            return res.status(401).json(new ServerException("Can not authorization"));

        }
        return res.status(401).json(new ServerException("Secret key is wrong !"));
    }

    authenWith(params) {
        if (this.#listClass.includes(params)) {
            return this._doAuthen.bind(params);
        } else {
            throw new Error('function error !');
        }
    }
}

export default new Authentication();