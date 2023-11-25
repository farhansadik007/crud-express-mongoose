import { IUser } from './user.interface'
import { User } from './user.model'

// creating user into database
const createUserIntoDB = async (user: IUser) => {
  const result = await User.create(user)
  return result
}

const getAllUsersFromDB = async () => {
  const result = await User.find().select('username fullName age email address')
  return result
}

const getOrdersFromDB = async () => {
  const result = await User.find().select('orders')
  return result
}

const getSingleUsersFromDB = async (userId: number) => {
  const userInstance = new User({ userId })
  const userExists = userInstance.isUserExists(userId)

  if (!userExists) return null

  const result = await User.findOne({ userId }).select('-_id -password -orders -isDeleted -__v')
  return result
}

const updateSingleUserFromDB = async (user: IUser, userId: number) => {
  const userInstace = new User({ userId })
  const userExists = userInstace.isUserExists(userId)
  if (!userExists) return null

  const result = await User.findOneAndUpdate({ userId }, user)
  return result
}

const addProductInOrderDB = async (user: any, userId: number) => {
  const userInstace = new User({ userId })
  const userExists = userInstace.isUserExists(userId)
  if (!userExists) return null

  const result = await User.findOne({ userId })
  result?.orders?.push(user)
  await result?.save()
  return result
}

const deleteUserFromDB = async (userId: number) => {
  const userInstance = new User({ userId })
  const userExists = userInstance.isUserExists(userId)

  if (!userExists) return null

  const result = await User.updateOne({ userId }, { isDeleted: true })
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getOrdersFromDB,
  getSingleUsersFromDB,
  updateSingleUserFromDB,
  addProductInOrderDB,
  deleteUserFromDB,
}
