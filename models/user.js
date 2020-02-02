import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    username: {
        type: String,
        required: false,
    },

    first_name: {
        type: String, 
        required: false,
    },

    last_name: {
        type: String,
        required: false,
    },

    email: {
        type: String,
        required: true
    },

}, {timestamps: true});

export default mongoose.model('user', UserSchema)