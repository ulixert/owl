import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserModel',
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
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' }],
      default: [],
    },
    // Useful for quick access without counting
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true, versionKey: false },
    toJSON: { virtuals: true, versionKey: false },
  },
);

export const PostModel = mongoose.model('Post', postSchema);
