import fs from "fs";
import path from "path";
import {FormatFn} from "morgan";

export const  accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
export const handler : FormatFn =  (tokens, req, res) => {
    return [
        tokens.method(req, res),
        decodeURI(String(tokens.url(req, res))), // I changed this from the doc example, which is the 'dev' config.
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        new Date()
    ].join(' ')
}
