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

const getOrders = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getOrdersFromDB()

    //sending response
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'No Order found!',
      error: {
        code: 500,
        description: 'No Order found!',
      },
    })
  }
}

const totalPrice = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getOrdersFromDB()

    const total = result[0]?.orders.reduce((acc, order) => {
      return acc + order.price * order.quantity;
    }, 0);

    //sending response
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: {
        "totalPrice": total
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'No Price found!',
      error: {
        code: 500,
        description: 'No Price found!',
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

const updateUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body
    const { userId: id } = req.params

    // call service functions to send data
    const result = await UserServices.updateSingleUserFromDB(userData, Number(id))

    //eslint-disable-next-line 
    const {_id, userId, password, hobbies, orders, isActive, isDeleted,...rest} = result._doc;
    /* eslint-enable no-var */
    //sending response
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: rest,
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

const addProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body
    const { userId: id } = req.params

    // call service functions to send data
    await UserServices.addProductInOrderDB(data, Number(id))

    //sending response
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
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
  getOrders,
  totalPrice,
  getSinglelUsers,
  updateUser,
  addProduct,
  deleteUser,
}
