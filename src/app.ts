import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.route'

const app: Application = express()

//for json parse
app.use(express.json())
app.use(cors())

//routes
app.use('/api/users', UserRoutes)

const getMessage = (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to CRUD-EXPRESS-MONGOOSE!'
    })
}

app.get('/', getMessage)

export default app
