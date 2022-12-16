import { conn } from './../index'
import { Request, Response } from 'express'

export const loadData = async (req: Request, res: Response) => {
	const userId = res.locals.user_id
	const [rows]: any = await conn.execute(`SELECT * FROM block WHERE user_id=${userId}`)
	rows.length > 0 ? res.send({ success: true, data: rows }) : res.send({ success: true, data: [] })
}
