const { mongoose,Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      select:false
    },
    firstName: String,
    lastName: String,
    img: String,
    linkedin: String,
    github: String,
    tech:[String],
    following:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    medals:{ 
      projects :{type: String, enum :["stone","bronce","silver","gold"]},
      comments :{type: String, enum :["stone","bronce","silver","gold"]},
      following :{type: String, enum :["stone","bronce","silver","gold"]},
      followers :{type: String, enum :["stone","bronce","silver","gold"]},
      likes :{type: String, enum :["stone","bronce","silver","gold"]},
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
