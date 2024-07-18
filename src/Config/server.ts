import express from "express"
import { Express } from "express"
import { Server as HttpServer, createServer } from "http";

export class App {
    public app: Express;
    private _port: number;
    public server: HttpServer;

    constructor() {
        this.app = express()
        this.server = createServer(this.app)
        this._port = Number(process.env.PORT) | 1500
    }

    start() {
        this.server.listen(this._port, () => {
            console.log(`🚀 Server is running at port ${ this._port }`)
        })
    }
}