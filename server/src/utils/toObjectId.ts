import mongoose from 'mongoose';

export function toObjectId(value: string) {
  return new mongoose.Types.ObjectId(value);
}
