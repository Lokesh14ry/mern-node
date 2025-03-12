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
const fs = require('fs')

app.get('/', (req, res) => {
    res.status(200).json({ message: 'This is home page' })
})


app.post('/blog',upload.single('image'),async (req, res) => {
    const {title, subtitle, description} = req.body
    const filename = req.file.filename

    if(!title || !subtitle || !description) {
        return res.status(400).json({ message: 'Please fill all fields' })
    }

    await Blog.create({
        title : title, 
        subtitle : subtitle, 
        description: description,
        image : filename
    })
    res.status(200).json({ message: 'blog created successfully!' })
})

app.get('/blog', async (req, res) => {
    const blogs = await Blog.find()
    res.status(200).json({ message: 'All blogs', data: blogs })
})

app.get("/blog/:id", async (req,res)=>{
    const id = req.params.id
    const blog = await Blog.findById(id)

    if(!blog){ return res.status(404).json({
        message : "no data found"
    })
}
    res.status(200).json({
        message : "found it",
        data : blog
    })
})

app.delete("/blog/:id",async (req,res)=>{
    const id = req.params.id
    const blog = await Blog.findById(id)
    const imageName = blog.image

    fs.unlink(`storage/${imageName}`,(err)=>{
        if(err){
            console.log(err)
        }else{ 
            console.log("File deleted successfully")

        }
        
    })
    await Blog.findByIdAndDelete(id)
    
    res.status(200).json
    ({
        message : 'Blog deleted successfully'
    })

})

app.patch('/blog/:id',upload.single('image'), async(req,res)=>{
    const id = req.params.id
    const {title,subtitle,description}= req.body
    let imageName;
    if(req.file){
        imageName=req.file.filename
        const blog = await Blog.findById(id)
        const oldImageName = blog.image
        
        fs.unlink(`storage/${oldImageName}`,(err)=>{
            if(err){
                console.log(err)
            }else{
                console.log("File update successfully")
            }
        })
    }
    await Blog.findByIdAndUpdate(id,{
        title : title,
        subtitle : subtitle,
        description : description,
        image : imageName
    })
    res.status(200).json({
        message :"Blog updated successfully"
    })
})



app.use(express.static('./storage'))

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 8888')
})