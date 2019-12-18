import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String, 
        required: true,
    },

    email: {
        type: String,
        required: true
    },

    hash: {
        type: String,
        required: true
    },

}, {timestamps: true})

export default mongoose.model('user', UserSchema)