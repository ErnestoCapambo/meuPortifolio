import multer from "multer";
import fs from "fs";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir('./uploads', (err) => {
      if (err) {
        cb(null, './uploads')
        return
      } else {
        cb(null, './uploads')
      }
    })
  },

  filename: (req, file, cb) => {
    cb(null, Date.now()+"-"+file.originalname)
  }
})

const upload = multer({ storage })

export { upload }