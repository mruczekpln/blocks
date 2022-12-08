import express, { Request, Response } from 'express'
import cors from 'cors'
import { createPool, Pool } from 'mysql2/promise'
import { config } from 'dotenv'
config()

import { LogIn } from './api/LogIn'
import { loadData } from './api/LoadData'
import { addBlock } from './api/AddBlock'

const app = express()

app.use(
	cors({
		origin: '*'
	})
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

export const conn = createPool({
	host: process.env['MYSQL_HOST'],
	user: 'root',
	database: 'blocksdb'
})

let userId: number
app.post('/login', (req: Request, res: Response) => LogIn(req, res).then(id => (userId = id)))
app.post('/load', (res: Response) => loadData(res, userId))
app.post('/add', (req: Request, res: Response) => addBlock(req, res, userId))

// app.delete('/delete', (req: Request, res: Response) => deleteBlock(req, res))

// app.options('/update', cors())
// app.put('/update', (req: Request, res: Response) => updateBlock(req, res))

app.listen(5000)
