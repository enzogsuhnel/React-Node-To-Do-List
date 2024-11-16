import mongoose from "mongoose";

const schemaUser = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});

const modelUser = mongoose.model("User", schemaUser);

export default modelUser;
