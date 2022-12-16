import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { createPool } from 'mysql2/promise'
import { config } from 'dotenv'
config()

import { LogIn } from './routes/LogIn'
import { loadData } from './routes/LoadData'
import { addBlock } from './routes/AddBlock'
import { deleteBlock } from './routes/DeleteBlock'
import { updateBlock } from './routes/UpdateBlock'
import { LogOut } from './routes/LogOut'
import { Register } from './routes/Register'
import { Auth } from './middleware/Auth'
import LoadAdminData from './routes/LoadAdminData'

const app = express()

app.use(
	cors({
		origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
		allowedHeaders: ['Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers', 'Access-Control-Allow-Credentials'],
		credentials: true
	})
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const { MYSQL_HOST, MYSQL_USERNAME, PORT } = process.env

export const conn = createPool({
	host: MYSQL_HOST,
	user: MYSQL_USERNAME,
	database: 'blocksdb'
})

app.post('/login', LogIn)
app.get('/logout', Auth, LogOut)
app.post('/register', Register)
app.post('/load', Auth, loadData)
app.post('/admin', Auth, LoadAdminData)
app.post('/add', Auth, addBlock)
app.delete('/delete', Auth, deleteBlock)
app.options('/update', cors())
app.put('/update', Auth, updateBlock)

app.listen(PORT)
