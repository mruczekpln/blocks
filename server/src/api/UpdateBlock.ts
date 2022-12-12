import { Request, Response } from 'express'
import { conn } from '..'

export const updateBlock = async (req: Request, res: Response) => {
	const { id, name, amount } = req.body

	const result = await conn.execute(`UPDATE block SET name="${name}", amount=${amount} WHERE id="${id}"`)
	console.log(result)

	res.status(200).send({
		success: true,
		block_id: id
	})
}
