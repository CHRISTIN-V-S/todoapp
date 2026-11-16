const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    }
}, { timestamps: true });

const Todo= mongoose.model("TodoTask", todoSchema);
module.exports=Todo