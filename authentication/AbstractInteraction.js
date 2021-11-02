
export default class AbstractInteraction{
    constructor() {
        if(!this.login)
            throw new Error("login must have");

        if(!this.logout)
            throw new Error("logout must have");

        if(!this.refreshToken)
            throw new Error("refreshToken must have");

        if(!this.getToken)
            throw new Error("getToken must have");

        if(!this.getTokenWithCode)
            throw new Error("getTokenWithCode must have");

        if(!this.storeToken)
            throw new Error("storeToken must have");

        if(!this.afterLogin)
            throw new Error("afterLogin must have");

        if(!this.authen)
            throw new Error("authen must have");
    }

    build_path($arr) {
        return $arr.join('/');
    }

    #http_build_query(object) {
        const params = new URLSearchParams(object);
        return params.toString();
    }

    build_query_string(object) {
        return decodeURIComponent(this.#http_build_query(object));
    }

    is_expire_time(timestamp){
        return (new Date()).getTime() >=timestamp;
    }
}