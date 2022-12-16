import { Request, Response } from 'express'
import { conn } from '..'

export const updateBlock = async (req: Request, res: Response, sessions: any) => {
	const { id, name, amount } = req.body

	await conn.execute(`UPDATE block SET name="${name}", amount=${amount} WHERE id="${id}"`)
	console.log(`updated with id: ${id}`)

	res.status(200).send({
		operation: 'updateBlock',
		success: true,
		block_id: id
	})
}
