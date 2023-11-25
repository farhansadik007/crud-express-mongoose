import { Schema, model } from 'mongoose'
import {
  IUser,
  IUserAddress,
  UserMethods,
  UserModel,
  IUserName,
  IUserOrder,
} from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userNameSchema = new Schema<IUserName>({
  firstName: {
    type: String,
    required: [true, 'firstName is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required'],
    trim: true,
  },
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
  userId: { type: Number, required: [true, 'ID is required'], unique: true },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
  },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: {
    type: userNameSchema,
    required: true,
  },
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, required: true, unique: true, trim: true },
  isActive: { type: Boolean },
  hobbies: { type: [String] },
  address: {
    type: UserAddressSchema,
    required: true,
  },
  orders: [UserOrderSchema],
  isDeleted: { type: Boolean, default: false },
})

//hashing password
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

//exclude deleted data
userSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

userSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

//custom instance method
userSchema.methods.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId })
  return existingUser
}

export const User = model<IUser, UserModel>('User', userSchema)
