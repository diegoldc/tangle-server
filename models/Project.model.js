const { mongoose,Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    github: {
      type: String,
      required: true
    },
    deployment: String,
    creationDate: { type: Date, default: Date.now },
    description: String,
    screenshots: [String],
    tech: [String],
    user: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
    collaborators:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
  }
);

const Project = model("Project", projectSchema);

module.exports = Project;
