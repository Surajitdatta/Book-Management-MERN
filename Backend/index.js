// index.js
require('dotenv').config()
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const { mongoDBURL, PORT } = require("./config"); 
const Book = require("./model/bookModel.js")
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(express.json());
app.use(cors())

// Proxy setup
// app.use('/api', createProxyMiddleware({ target: 'http://localhost:4000', changeOrigin: true }));




app.get("/", async(req, res)=>{
    try{
      const book = await Book.find({})
      res.status(200).json(book)
    } catch(err){
      res.status(500).json({message: err.message})
    }
});

//get single product
app.get("/books/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const singleBook = await Book.findById(id)
        if(!singleBook){
            res.status(404).json({message:"Item not found"})
        }
        res.status(200).json(singleBook)
    } catch(err){
        console.log(res.status(500).send("Server error for single item"))
    }

})

//post req for book
app.post("/books", async(req, res)=>{
    try{
        if( !req.body.title || !req.body.publishYear || !req.body.author ){
            return res.status(400).send({message: "All fields are require."})
        }
        const newBook = {
            title : req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook)
        return res.status(201).send(book)

    } catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }

})

//put req for book
app.put("/books/:id", async(req, res)=>{
    try{
        const {id} = req.params
        const updateBook = await Book.findByIdAndUpdate(id, req.body)
        if(!updateBook){
            return res.send(404).json({message:"Item not found"})
        }
        res.status(200).json({
            message:"Product updated successfully",
            data: req.body
        })


    }catch(err){
        console.log(err)
        res.status(500).send("Internal server err")

    }
})

//Delete product of book
app.delete("/books/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBook = await Book.findByIdAndDelete(id);
      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json({
        message: "Book deleted successfully",
        data: deletedBook
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });
  






const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`The server is started on ${port}`);
});


mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("Database is connected.")

})
.catch((err)=>{
    console.log("Database connection failed.")
})