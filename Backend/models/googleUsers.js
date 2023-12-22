import mongoose from "mongoose";

const googleUserStructure = new mongoose.Schema({
  fullName : String,
  email : String
});

const googleUserModel = mongoose.model("GoogleUserData", googleUserStructure);

export default googleUserModel;