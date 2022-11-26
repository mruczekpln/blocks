import express from 'express'
import cors from 'cors'
import { createConnection, createPool } from 'mysql2'

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

const conn = createPool({
	host: '172.21.240.1',
	user: 'admin',
	password: 'norbi123',
	database: 'blocksdb'
	// socketPath: 'C:/xampp/mysql/mysql.sock'
})

app.get('/', (req, res) => {
	res.send(req.body)
	console.log('success')
})

app.post('/add', (req, res) => {
	const data = req.body || {}
	console.log(`added with id: ${data.id}`)

	conn.getConnection((err, connection) => {
		if (err) throw err
		connection.query(`INSERT INTO block (id, name, amount) VALUES ("${data.id}", "${data.name}", ${data.amount})`)
		connection.release()
	})

	res.json({
		block_id: data.id,
		operation: 'add',
		success: true
	})
})

app.post('/delete', (req, res) => {
	const id = req.body.id || ''
	console.log(`deleted with id: ${id}`)

	conn.getConnection((err, connection) => {
		if (err) throw err
		connection.query(`DELETE FROM block WHERE id = "${id}"`)
		connection.release()
	})

	res.json({
		block_id: id,
		operation: 'delete',
		success: true
	})
})

app.listen(5000)
