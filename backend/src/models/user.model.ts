import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  dateOfBirth: Date;
  state: string;
  city: string;
  vegOrNonVeg: string;
  hobbies: string[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  vegOrNonVeg: { type: String, required: true },
  hobbies: { type: [String], required: true }
});

export const UserModel = model<IUser>('User', userSchema);
