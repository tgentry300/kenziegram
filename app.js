const express = require("express")
const multer = require("multer");
const fs = require("fs");

const publicPath = 'public/';
const uploadPath = './public/uploads';

const port = 3000;

const app = express();

app.use(express.static(publicPath));
const upload = multer({ dest: uploadPath });


app.post('/public/uploads', upload.single('myFile'), function (req, res, next) {
    res.send(`<h2>Successful Upload!</h2> <a href="http://localhost:3000">Back</a>`)
})

app.get("/", (req, res) => {
    let photoArray = [];
    fs.readdir(uploadPath, (err, items) => {
        console.log(items);

        items.forEach(image => photoArray.push(`<img src=http://localhost:3000/uploads/${image}>`))
        res.send(
            `<link rel="stylesheet" href="index.css">
            <body>
            <h1>KenzieGram</h1>
            <form action="/public/uploads" enctype="multipart/form-data" method="POST">
            <input type="file" name="myFile">
            <input type="submit">
            
            </form>
            ${photoArray}
            </body>
            `
        )
    })
})

app.listen(port)
