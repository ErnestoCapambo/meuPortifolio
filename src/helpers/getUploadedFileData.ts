import "dotenv/config";
import { Request } from "express";

export function getUploadedFileData (file: Request["file"]) {

    if (!file)
        return {
            url: null,
            mimetype: null,
            key: null,
            size: null,
        }

    return {
        url: `${process.env.APP_URL}/${file.filename}`,
        mimetype: file.mimetype,
        key: file.filename,
        size: file.size,
    }
}