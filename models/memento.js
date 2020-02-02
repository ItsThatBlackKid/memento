import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MementoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    mood: {
        type: Number,
        min: 0,
        max: 1,
        default: 0.5
    },
    content: {
        type: String, 
        required: true
    }
})

export default mongoose.model('memento', MementoSchema)