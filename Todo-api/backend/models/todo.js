import mongoose from "mongoose";

const modelSchema = new mongoose.Schema({
    value: {
        type: String,
        required: [true, "value is required"],
    },
    userid: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    } 
)

export const model = mongoose.model("model", modelSchema)



