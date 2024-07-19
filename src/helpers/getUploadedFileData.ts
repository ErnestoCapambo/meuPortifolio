import "dotenv/config";
import { Request } from "express";

export function getUploadedFileData (file: Request["file"]) {
    const STORAGE_TYPE = process.env.STORAGE_TYPE || 'local';

    if (!file)
        return {
            url: null,
            mimetype: null,
            key: null,
            size: null,
        }

    // if (STORAGE_TYPE === "s3")
    //     return {
    //         url: file.location,
    //         mimetype: file.mimetype,
    //         key: file.key,
    //         size: file.size,
    //     }

    return {
        url: `${process.env.APP_URL}/files/${file.filename}`,
        mimetype: file.mimetype,
        key: file.filename,
        size: file.size,
    }
}