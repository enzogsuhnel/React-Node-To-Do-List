import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  taskListId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TaskList',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
  },
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
