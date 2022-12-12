import { conn } from './../index'
import { Request, Response } from 'express'

export const loadData = async (req: Request, res: Response, id: number | null) => {
	if (id === null) {
		res.send({ success: false })
		return null
	}

	const [rows]: any = await conn.execute(`SELECT * FROM block WHERE user_id=${id}`)
	rows.length > 0 ? res.send({ success: true, data: rows }) : res.send({ success: true, data: [] })
}
