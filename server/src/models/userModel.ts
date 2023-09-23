import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minLength: 6,
      require: true,
    },
    profilePicUrl: {
      type: String,
      default: '',
    },
    followers: {
      type: [String],
      default: [],
    },
    following: {
      type: [String],
      default: [],
    },
    biography: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model('User', userSchema);
