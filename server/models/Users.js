import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Username is required'],
  },
  firstName: {
    type: String,
    required: [true, 'Firstname is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Lastname is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [5, 'Contraseña debe tener al menos 5 caracteres'],
  },

    savedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  }, { timestamps: true });


export const UserModel = mongoose.model("users", UserSchema);
