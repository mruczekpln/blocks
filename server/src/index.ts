import express, { Request, Response } from 'express'
import cors from 'cors'
import { createPool, Field, Pool, QueryError, RowDataPacket } from 'mysql2'
import { config } from 'dotenv'
config()

interface IResponse {
	id: string
	name: string
	amount: number
}

const app = express()

app.use(
	cors({
		origin: '*'
	})
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const conn: Pool = createPool({
	host: process.env['MYSQL_HOST'],
	user: 'root',
	database: 'blocksdb'
})

let result: string = ''
function respondWithResult(message: string, res: Response, req?: Request) {
	res.send(JSON.stringify({ result: message }))
	console.log(message, `from ip: ${req?.ip}`)
}

app.get('/', (req: Request, res: Response) => {
	conn.getConnection((err, connection) => {
		if (err) {
			respondWithResult(err.code!, res)
			throw err
		}

		connection.query('SELECT * FROM block', (err: QueryError, rows: RowDataPacket[]) => {
			if (err) {
				result = err?.message || 'query problem'
				respondWithResult(result, res)
				throw err
			}

			res.send(rows)
		})

		// result = `connection established with database ${connection.threadId}`
		// respondWithResult(result, res, req)
		connection.release()
	})
})

app.post('/add', (req: Request, res: Response) => {
	const { id, name, amount } = req.body

	conn.getConnection((err, connection) => {
		if (err) {
			result = `ERROR: couldnt add with id: ${id}, err code: ${err.code}`
			// res.send(result)
			respondWithResult(result, res)
			throw err
		}

		connection.query(`INSERT INTO block (id, name, amount) VALUES ("${id}", "${name}", ${amount})`, err => {
			if (err) {
				result = err?.message || 'query problem'
				respondWithResult(result, res)
				throw err
			}
		})
		connection.release()

		result = `added with id: ${id}`
		respondWithResult(result, res, req)
	})
})

app.post('/delete', (req: Request, res: Response) => {
	const { id } = req.body

	conn.getConnection((err, connection) => {
		if (err) {
			result = `ERROR: couldnt add with id: ${id}, err code: ${err.code}`
			respondWithResult(result, res)
			throw err
		}

		connection.query(`DELETE FROM block WHERE id = "${id}"`, err => {
			if (err) {
				result = err?.message || 'query problem'
				respondWithResult(result, res)
				throw err
			}
		})
		connection.release()

		result = `deleted with id: ${id}`
		respondWithResult(result, res, req)
	})
})

app.post('/update', (req: Request, res: Response) => {
	const { id, name, amount } = req.body

	conn.getConnection((err, connection) => {
		if (err) {
			result = 'conn err'
			respondWithResult(result, res)
			throw err
		}

		connection.query(`UPDATE block SET name="${name}", amount=${amount} WHERE id="${id}"`, err => {
			if (err) {
				result = 'query problem'
				respondWithResult(result, res)
				throw err
			}
		})

		connection.release()

		result = `updated with id: ${id}`
		respondWithResult(result, res, req)
	})
})

app.listen(5000)
