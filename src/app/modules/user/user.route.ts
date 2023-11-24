import express from 'express'
import { UserControllers } from './user.controller'

const router = express.Router()

//create a user
router.post('/', UserControllers.createUser)

// get all users
router.get('/', UserControllers.getAllUsers)

// get single user
router.get('/:userId', UserControllers.getSinglelUsers)

//delete single user
router.delete('/:userId', UserControllers.deleteUser)

export const UserRoutes = router
