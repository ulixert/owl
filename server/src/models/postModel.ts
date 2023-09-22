import mongoose from 'mongoose';

export const postSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    maxLength: 280,
  },
  img: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  replies: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      text: {
        type: String,
        maxLength: 280,
        required: true,
      },
      userProfilePic: {
        type: String,
      },
      username: {
        type: String,
        required: true,
      },
    },
  ],
});
