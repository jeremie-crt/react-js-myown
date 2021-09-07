let express = require('express');
let app = express();
let multer = require('multer')
let cors = require('cors');

app.use(cors())

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

//let upload = multer({ storage: storage }).single('file')
let upload = multer({ storage: storage }).array('file')


app.post('/upload',function(req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
});

app.listen(8000, function() {
    console.log('App running on port 8000');
});