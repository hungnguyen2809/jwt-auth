import mongoose from 'mongoose';

const UserSchame = new mongoose.Schema(
  {
    username: { type: String, required: true, minlength: 6, maxlength: 20, unique: true },
    password: { type: String, required: true, minlength: 6 },
    email: { type: String, required: true, unique: true, minlength: 6 },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model('Users', UserSchame);
