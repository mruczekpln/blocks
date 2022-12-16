import { Request, Response } from 'express'
import { conn } from '..'

export const deleteBlock = async (req: Request, res: Response, sessions: any) => {
	const { id } = req.body

	await conn.execute(`DELETE FROM block WHERE id = "${id}"`)
	console.log(`deleted with id: ${id}`)

	res.send({
		operation: 'deleteBlock',
		success: true,
		block_id: id
	})
}
