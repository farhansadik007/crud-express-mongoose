import { Schema, model } from 'mongoose'
import { IUser, IUserAddress, UserMethods, UserModel, IUserName, IUserOrder } from './user.interface'

const userNameSchema = new Schema<IUserName>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
})

const UserAddressSchema = new Schema<IUserAddress>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
})

const UserOrderSchema = new Schema<IUserOrder>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
})

const userSchema = new Schema<IUser, UserModel, UserMethods>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String },
  fullName: {
    type: userNameSchema,
    required: true
  },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  isActive: { type: Boolean },
  hobbies: { type: [String] },
  address: {
    type: UserAddressSchema,
    required: true
  },
  orders: [UserOrderSchema],
})

userSchema.methods.isUserExists = async function(userId: number) {
  const existingUser = await User.findOne({userId});
  return existingUser;
}

export const User = model<IUser, UserModel>('User', userSchema)
