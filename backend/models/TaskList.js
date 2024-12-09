import mongoose from "mongoose";

const taskListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sharedWith: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
});

const TaskList = mongoose.model("TaskList", taskListSchema);
export default TaskList;
