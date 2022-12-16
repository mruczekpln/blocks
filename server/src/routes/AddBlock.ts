import { Response, Request } from 'express'
import { conn } from '../index'

export const addBlock = async (req: Request, res: Response, sessions: any) => {
	const { id, name, amount } = req.body
	const userId = res.locals.user_id

	await conn.execute(`INSERT INTO block (id, name, amount, user_id) VALUES ("${id}", "${name}", ${amount}, ${userId})`)
	console.log(`added with id: ${id}`)

	res.status(200).send({
		operation: 'addBlock',
		success: true,
		block_id: id
	})
}
