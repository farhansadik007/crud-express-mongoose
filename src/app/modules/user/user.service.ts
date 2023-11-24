import { IUser } from './user.interface'
import { User } from './user.model'

// creating user into database
const createUserIntoDB = async (user: IUser) => {
    const result = await User.create(user)
    return result
}

const getAllUsersFromDB = async () => {
    const result = await User.find().select(
        'username fullName age email address',
    )
    return result
}

const getSingleUsersFromDB = async (userId: number) => {

    const userInstance = new User({ userId });
    const userExists = userInstance.isUserExists(userId);

    if (!userExists) return null;

    const result = await User.findOne({ userId }).select(
        '-password -orders',
    )
    return result
}

export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUsersFromDB,
}
