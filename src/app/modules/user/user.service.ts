import { User } from './user.interface'
import { UserModel } from './user.model'

// creating user into database
const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user)
  return result
}

const getAllUsersFromDB = async () => {
  const result = await UserModel.find().select(
    'username fullName age email address',
  )
  return result
}

const getSingleUsersFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId }).select(
    'username fullName age email address',
  )
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUsersFromDB,
}
