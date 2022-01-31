import path from "path"
import express from "express"
import multer from "multer"

const router = express.Router()

const storage = multer.diskStorage({  //initialize storage engine
    destination(req, file, cb) {
        cb(null, "uploads/")
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)  //path.extname za izvuc ekstenziju
    }  
})

function checkFileType(file, cb) {
    const fileTypes = /jpg|jpeg|png/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase()) // usporedi ekstenzije
    const mimeType = fileTypes.test(file.mimeType) //mimetype npr .img

    if (extname && mimeType) {
        return cb(null, true)
    } else {
        cb("Images only!")  //pozovi error, stackovrflow
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
})

router.post("/", upload.single("image"), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router