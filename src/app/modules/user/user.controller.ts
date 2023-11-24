import { Request, Response } from 'express'
import { UserServices } from './user.service'
import userValidationSchema from './user.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body
    const zodData = userValidationSchema.parse(userData)

    // call service functions to send data
    const result = await UserServices.createUserIntoDB(zodData)

    //sending response
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: {
        code: 500,
        description: 'Something went wrong!',
      },
    })
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB()

    //sending response
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'No user found!',
      error: {
        code: 500,
        description: 'No user found!',
      },
    })
  }
}

const getSinglelUsers = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getSingleUsersFromDB(parseFloat(userId))

    //sending response
    if (result != null) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      })
    } else throw new Error()
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.deleteUserFromDB(parseFloat(userId))

    //sending response
    if (result != null) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: result,
      })
    } else throw new Error()
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
export const UserControllers = {
  createUser,
  getAllUsers,
  getSinglelUsers,
  deleteUser,
}
