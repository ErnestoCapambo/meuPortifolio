import fs from "fs"
// import path from "path";

export async function deleteFile(filename: string) {

    if(!filename) return;

    fs.rm(filename, () => {

    })

}