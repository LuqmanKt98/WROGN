import mongoose from "mongoose";

const userDataStructure = new  mongoose.Schema({
    fullName : String,
    email : String,
    password : String
});

export const userDataModel = mongoose.model("userData",userDataStructure);