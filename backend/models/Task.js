import mongoose from "mongoose";

const schemaTask = mongoose.Schema({
  title: { type: String },
  status: { type: Boolean },
  description: { type: String },
});

const Task = mongoose.model("Task", schemaTask);

export default Task;
