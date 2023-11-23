import express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express()

//for json parse
app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Hi!')
})

export default app
