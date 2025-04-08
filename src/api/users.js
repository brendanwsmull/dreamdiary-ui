import mongoose from 'mongoose';

const nightSchema = new mongoose.Schema({
    date: {type: Date},
    dreamEntry: {type: String},
    sleepAmount: {type: Number}
})

const userSchema = new mongoose.Schema({
    username: {type: String},
    email: {type: String},
    salt: {type: String},
    hash: {type: String},
    nights: [nightSchema]
})

const userModel = mongoose.model('User', userSchema, "users");
export default userModel;