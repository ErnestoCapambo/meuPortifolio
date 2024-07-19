import "dotenv/config"
import express, { NextFunction, Request, Response } from "express"
import { Express } from "express"
import { Server as HttpServer, createServer } from "http";
import { HttpError } from "http-errors";
import { deleteFile } from "../helpers/deleteFile";
import { getUploadedFileData } from "../helpers/getUploadedFileData";


export class App {
    public app: Express;
    private _port: number;
    public server: HttpServer;

    constructor() {
        this.app = express()
        this.server = createServer(this.app)
        this._port = Number(process.env.PORT) || 3345

        this.app.use(express.json())
    }

    routes() {
        this.app.use(
            (
                error: HttpError,
                req: Request,
                res: Response,
                next: NextFunction
            ) => {

                // Seta o HTTP Status Code
                res.status(error.status || 500)

                if (req.file)
                    deleteFile(String(getUploadedFileData(req.file).key))

                // Deletando a lista de arquivos no caso de Houver
                // algum erro durante a requisição
                if (req.files) {
                    Object.values(req.files).forEach(file => {
                        if (file[0])
                            deleteFile(String(getUploadedFileData(file[0]).key));

                        if (file)
                            deleteFile(String(getUploadedFileData(file).key));
                    });
                }
            }
        )
    }
    
    start() {
        this.server.listen(this._port, () => {
            console.log(`🚀 Server is running at port ${this._port}`)
        })
    }
}