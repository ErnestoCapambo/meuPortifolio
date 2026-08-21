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
        const allowedOrigins = (process.env.CORS_ORIGIN || '*')
            .split(',')
            .map(o => o.trim());

        this.app.use(cors({
            origin: (origin, callback) => {
                if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true,
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
