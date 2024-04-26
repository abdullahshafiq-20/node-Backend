import express from "express"
import mongoose from "mongoose"
import Product from "./models/product.js"
const app = express()
const PORT = process.env.PORT || 5000

const uri = "mongodb+srv://elderbrotherwedding:A_hd3LZtd.PcXBQ@crud.u8eekys.mongodb.net/load-api?retryWrites=true&w=majority&appName=crud"

//body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.json({
        message: "HELLO WORLD"
    })
})

app.post("/products", async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }
    catch (err) {
        console.log(err)

    }
})


mongoose.connect(uri)
    .then(() => {
        console.log("Database connected")

        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`)
        })

    })
    .catch(err => console.log(err))


