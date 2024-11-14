import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
      select: false,
    },
    profilePicUrl: {
      type: String,
      default: null,
    },
    followers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' }],
      default: [],
    },
    following: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' }],
      default: [],
    },
    biography: {
      type: String,
      default: '',
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true, versionKey: false },
    toJSON: { virtuals: true, versionKey: false },
  },
);

export const UserModel = mongoose.model('User', userSchema);
