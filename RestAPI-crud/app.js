import express from "express"
import mongoose from "mongoose"
import Product from "./models/product.js"
const app = express()
const PORT = process.env.PORT || 5000


// mongo db connection
const uri = "mongodb+srv://elderbrotherwedding:A_hd3LZtd.PcXBQ@crud.u8eekys.mongodb.net/load-api?retryWrites=true&w=majority&appName=crud"

//body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.json({
        message: "HELLO WORLD"
    })
})

// get all products from the database
app.get("/products", async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    }
    catch (err) {
        console.log(err)

    }
})


// get a single product from the database
app.get("/products/:id", async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    }
    catch (err) {
        console.log(err)

    }
})

// update a product in the database
app.put("/products/:id", async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product) {
            return res.status(404).json({message: "Product not found"})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)

    }
    catch (err) {
        console.log(err)

    }
})

app.delete("/products/:id", async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id, req.body)
        if(!product) {
            return res.status(404).json({message: "Product not found"})
        }
        res.status(200).json(product)

    }
    catch (err) {
        console.log(err)

    }
})


// save the product to the database
app.post("/products", async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }
    catch (err) {
        console.log(err)

    }
})





// connection to the database
mongoose.connect(uri)
    .then(() => {
        console.log("Database connected")

        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`)
        })

    })
    .catch(err => console.log(err))


