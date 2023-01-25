import { Schema, model } from 'mongoose'
import IUser from './user.interface'

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  owner: { type: Boolean, default: false }
})

const UserModel = model<IUser>('User', UserSchema)
export default UserModel
