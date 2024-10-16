const { mongoose,Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const commentSchema = new Schema(
  {
    content: {type:String,required:true},
    project: {type:mongoose.Schema.Types.ObjectId, ref:"Project"},
    user: {type:mongoose.Schema.Types.ObjectId, ref:"User"}
  },
  {   
    timestamps: true
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
