import { Schema, model } from 'mongoose'
import { User, UserAddress, UserName, UserOrder } from './user.interface'

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
})

const UserAddressSchema = new Schema<UserAddress>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
})

const UserOrderSchema = new Schema<UserOrder>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
})

const userSchema = new Schema<User>({
  userId: { type: Number },
  username: { type: String, required: true },
  password: { type: String },
  fullName: userNameSchema,
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean },
  hobbies: { type: [String] },
  address: UserAddressSchema,
  orders: [UserOrderSchema],
})

export const UserModel = model<User>('User', userSchema)
