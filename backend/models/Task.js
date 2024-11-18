import mongoose from "mongoose";

const schemaTask = model("Task", {
  title: { type: String },
  status: { type: Boolean },
  description: { type: String },
  users: { type: [String] },
});

module.exports = mongoose.model("Task", schemaTask);
