import { Request, Response } from 'express'
import { conn } from '..'

export const deleteBlock = (req: Request, res: Response) => {
	const { id } = req.body

	// conn.getConnection((err, connection) => {
	// 	if (err) {
	// 		res.status(501).send('database connection error')
	// 		throw err
	// 	}

	// 	connection.query(`DELETE FROM block WHERE id = "${id}"`, err => {
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
