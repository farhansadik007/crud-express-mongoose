import { Model } from 'mongoose'

// for the fullname data
export interface IUserName {
  firstName: string
  lastName: string
}

export interface IUserAddress {
  street: string
  city: string
  country: string
}

export interface IUserOrder {
  productName: string
  price: number
  quantity: number
}

// interface for the user
export interface IUser {
  userId: number
  username: string
  password: string
  fullName: IUserName
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: IUserAddress
  orders?: IUserOrder[]
  isDeleted?: boolean
}

export interface UserMethods {
  /* eslint-disable no-unused-vars */
  isUserExists(userId: number): Promise<IUser | null>
  /* eslint-enable no-unused-vars */
}

export type UserModel = Model<IUser, Record<string, never>, UserMethods>
