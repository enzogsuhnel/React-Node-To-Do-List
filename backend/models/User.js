import mongoose from "mongoose";

const schemaUser = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  taskList: { type: Array },
});

const modelUser = mongoose.model("User", schemaUser);

export default modelUser;


const tasksListschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tasks: {
    type: [tasks], // duração em horas
    required: true,
  },
});
//Ver como fazer aqui -> 
const tasks = 

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  listsTaskList: {
    type: [tasksListschema], // array de objetos contendo preço e duração
    required: true,
  },
});

const User = mongoose.model('User', userSchema);
export default User;