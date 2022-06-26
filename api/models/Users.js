import mongoose from "mongoose"
const { Schema } = mongoose;

const User = new Schema({
    name: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true}
})

const Users = mongoose.model("Users", User)
export default Users;
