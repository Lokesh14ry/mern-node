const express = require('express');
require('dotenv').config(); // Import dotenv
const connectToDataBase = require('./database')// Import connection.js

const app = express()
app.use(express.json()) // Middleware to parse json data
const Blog = require('./model/blogModel'); // Import Blog model
const { title } = require('process');
connectToDataBase ()

app.use(express.json())
const {multer,storage} = require('./middleware/multerConfig')
const upload = multer({storage: storage})

app.get('/', (req, res) => {
    res.status(200).json({ message: 'This is home page' })
})


app.post('/blog',upload.single('image'), (req, res) => {
    res.status(200).json({ message: 'Uploaded successfully!' })
})

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 8888')
})