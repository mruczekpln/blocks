import express, { Request, Response } from 'express'
import cors from 'cors'
import { createPool, Pool } from 'mysql2/promise'
import { config } from 'dotenv'
config()

import { LogIn } from './api/LogIn'
import { loadData } from './api/LoadData'
import { addBlock } from './api/AddBlock'
import { deleteBlock } from './api/DeleteBlock'
import { updateBlock } from './api/UpdateBlock'
import { LogOut } from './api/LogOut'
import { Register } from './api/Register'
import LoadAdminData from './api/LoadAdminData'

const app = express()

app.use(
	cors({
		origin: '*',
		allowedHeaders: '*'
	})
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const { MYSQL_HOST, MYSQL_USERNAME, PORT } = process.env

export const conn = createPool({
	host: MYSQL_HOST,
	user: MYSQL_USERNAME,
	database: 'blocksdb'
})

let userId: number | null = null
app.post('/login', (req: Request, res: Response) => LogIn(req, res).then(id => (userId = id)))
app.get('/logout', () => (userId = LogOut()))
app.post('/register', (req: Request, res: Response) => Register(req, res))
app.post('/load', (req: Request, res: Response) => loadData(req, res, userId))
app.post('/admin', (req: Request, res: Response) => LoadAdminData(res))
app.post('/add', (req: Request, res: Response) => addBlock(req, res, userId))
app.delete('/delete', (req: Request, res: Response) => deleteBlock(req, res))
app.options('/update', cors())
app.put('/update', (req: Request, res: Response) => updateBlock(req, res))

app.listen(PORT)
