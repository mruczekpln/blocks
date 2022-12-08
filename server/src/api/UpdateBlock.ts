import { Request, Response } from 'express'
import { conn } from '..'

export const updateBlock = async (req: Request, res: Response) => {
	const { id, name, amount } = req.body

	// await conn.getConnection((err, connection) => {
	// 	if (err) {
	// 		res.status(501).send('database connection error')
	// 		throw err
	// 	}

	// 	connection.query(`UPDATE block SET name="${name}", amount=${amount} WHERE id="${id}"`, err => {
	// 		if (err) {
	// 			res.status(502).send('database query error')
	// 			throw err
	// 		}
	// 	})

	// 	res.status(200).send({
	// 		success: true,
	// 		block_id: id
	// 	})

	// 	connection.release()
	// })
}
