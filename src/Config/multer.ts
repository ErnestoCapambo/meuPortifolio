import { diskStorage, Options } from "multer";
import { resolve } from "path";
import { randomBytes } from "crypto";
import dotenv from "dotenv"
dotenv.configDotenv()


const pathToSaveFile = resolve(__dirname, "../uploads")

const storageTypes = {
  local: diskStorage({
    destination: (request, file, callback) => {
      callback(null, pathToSaveFile)
    },

    filename: (request, file, callback) => {
      randomBytes(16, (error, hash) => {
        if (error) {
          callback(error, file.filename);
        }

        const extension = file.originalname.split(".")[1];

        const filename = `mister_wasnt_${hash.toString("hex") + Date.now()}.${extension}`;

        callback(null, filename);
      });
    },
  })
}

const multerConfig: Options = {
  storage: storageTypes.local,

}

export { multerConfig }