import mongoose from "mongoose"
const { Schema } = mongoose;

const data = new Schema({
    name: {type: String, required:true},
    location: {type: String, required:true},
    desc: String,
    date: {type: Date, default: Date.now},
    pictures: [String],
    found: { type: Boolean, required: true },
    user: String
})
//for text based search 
data.index({
    name: 'text',
    user: 'text',
    location: 'text'
});

const Data = mongoose.model("Data", data)

export default Data;