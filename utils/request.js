import axios from "axios";
import https from "https";

export const send = function (URL, endPoint, method, headers, body) {
    return axios({
        method,
        url: `${URL}/${endPoint}`,
        headers,
        data: body
    });
}

export const sendWithNotSSL = function (URL, endPoint, method, headers, body) {
    const myAgent = new https.Agent({
        rejectUnauthorized: false
    });
    return axios({
        method,
        url: `${URL}/${endPoint}`,
        headers,
        data: body,
        httpsAgent: myAgent
    });
}
