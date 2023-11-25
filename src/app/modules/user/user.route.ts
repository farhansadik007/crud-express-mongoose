import express from 'express'
import { UserControllers } from './user.controller'

const router = express.Router()

//create a user
router.post('/', UserControllers.createUser)

// get all users
router.get('/', UserControllers.getAllUsers)

// retrive
router.get('/:userId/orders', UserControllers.getOrders)

// get single user
router.get('/:userId', UserControllers.getSinglelUsers)

// update user info
router.put('/:userId', UserControllers.updateUser)

// add new product
router.put('/:userId/orders', UserControllers.addProduct)

//delete single user
router.delete('/:userId', UserControllers.deleteUser)

export const UserRoutes = router
