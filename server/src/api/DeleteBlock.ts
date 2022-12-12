import { Request, Response } from 'express'
import { conn } from '..'

export const deleteBlock = async (req: Request, res: Response) => {
	const { id } = req.body

	const result = await conn.execute(`DELETE FROM block WHERE id = "${id}"`)
	console.log(result)

	res.send({
		success: true,
		block_id: id
	})
}
