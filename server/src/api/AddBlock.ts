import { Response, Request } from 'express'
import { conn } from '../index'

export const addBlock = async (req: Request, res: Response, userId: number) => {
	const { id, name, amount } = req.body
	console.log('addblock', userId)

	const [rows]: any = await conn.execute(`INSERT INTO block (id, name, amount, user_id) VALUES ("${id}", "${name}", ${amount}, ${userId})`)
	console.log(rows)

	res.status(200).send({
		success: true,
		user_id: userId,
		block_id: id
	})
}
