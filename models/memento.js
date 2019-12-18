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
        type: String,
        enum: ['HAPPY', 'SAD', 'ANGRY', 'FRUSTRATED', 'N/A'],
        default: 'N/A'
    },
    content: {
        type: String, 
        required: true
    }
})

export default mongoose.model('memento', MementoSchema)