import mongoose from "mongoose";
import { Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now()
  },
});

// Transform the data to modify the structures and deleting confidential data.
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  }
});

// Using unique validator to check the unique key
userSchema.plugin(mongooseUniqueValidator, { message: "Email has already in use" });

const User = mongoose.model("user", userSchema);

export default User;