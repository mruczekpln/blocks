import { conn } from './../index'
import { Request, Response } from 'express'

export const loadData = async (res: Response, id: number) => {
	const [rows]: any = await conn.execute(`SELECT * FROM block WHERE user_id=${id}`)
	rows.length > 0 ? res.send(rows) : console.log('no blocks')
}
