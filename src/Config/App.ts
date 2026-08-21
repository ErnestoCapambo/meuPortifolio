import { Express } from "express"
import express from "express"
import cors from "cors"
import path from "path"
import { Server as HttpServer, createServer } from "http";
import { routes } from "../routes";


export class App {
    public app: Express;
    private _port: number;
    public server: HttpServer;

    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.middlewares();
        this.app.use(routes)
        this._port = Number(process.env.PORT) || 3345;
    }

    middlewares() {
        this.app.use(cors({
            origin: process.env.CORS_ORIGIN || '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
        this.app.use(express.json());
        this.app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
    }
    
    start() {
        this.server.listen(this._port, () => {
            console.log(`Server is running at port ${this._port}`)
        })
    }
}
