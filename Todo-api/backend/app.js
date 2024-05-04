import express, { response } from "express"
import mongoose from "mongoose"
import {model} from "./models/todo.js"
const app = express()
const PORT = process.env.PORT || 5000
import cors from "cors"


// mongo db connection
const uri = "mongodb+srv://elderbrotherwedding:A_hd3LZtd.PcXBQ@crud.u8eekys.mongodb.net/todo-api?retryWrites=true&w=majority&appName=crud"

//body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: "*" }))

app.get("/", (request, response) => {
    response.json({
        message: "HELLO WORLD"
    })
})

app.post("/add", async (request, response) =>{
    try {
        const { value, userid } = request.body
        const todo = new model({
            value,
            userid
        })
        const Todoresponse = await model.create(todo)
        response.json(
            {
                message: "Todo added successfully",
                data: Todoresponse,
                status:true
            }
        ) 
    } catch (error) {
        response.json({
            message: "An error occured",
            data:[],
            error: error.message,
            status: false
        })
        
    }
})

app.put("/update/:id", async (request, response) => {
    try {

        const id = request.params.id
        const { value } = request.body

        const obj = {
            value,
        }
        const Todoresponse = await model.findByIdAndUpdate(id, obj, { new: true })
        response.json({
            message: "post updated!",
            data: Todoresponse,
            status: true
        })

    } catch (error) {
        response.json({
            message: error.message,
            data: [],
            status: false
        })
    }
})

app.delete("/delete/:id", async (request, response) => {
    try {
        const id = request.params.id
        const todo = await model.findByIdAndDelete(id)
        response.json({
            message: "post deleted!",
            status: true
        })

    } catch (error) {
        response.json({
            message: error.message,
            data: [],
            status: false
        })
    }
})

app.get("/get", async (request, response) => {
    try {
        const todos = await model.find({})
        response.json({
            message: "Todos fetched successfully",
            data: todos,
            status: true
        })
    } catch (error) {
        response.json({
            message: "An error occured",
            data:[],
            error: error.message,
            status: false
        })
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


