import { conn } from '..'
import { Request, Response } from 'express'

export default async function LoadAdminData(req: Request, res: Response) {
	const [users]: any = await conn.execute('SELECT * FROM user')
	console.log(users)

	const data = await Promise.all(
		users.map(async (item: any) => {
			const [rows]: any = await conn.execute(`SELECT * FROM block WHERE user_id=${item.id}`)

			return { ...item, rows }
		})
	)

	console.log(data)

	res.send(data)
}
