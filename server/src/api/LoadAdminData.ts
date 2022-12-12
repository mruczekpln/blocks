import { conn } from '..'
import { Response } from 'express'

export default async function LoadAdminData(res: Response) {
	const [users]: any = await conn.execute('SELECT * FROM user')
	console.log(users)

	const data = await Promise.all(
		users.map(async (item: any) => {
			const [rows]: any = await conn.execute(`SELECT * FROM block WHERE user_id=${item.id}`)

			return { ...item, rows }
		})
	)

	res.send(data)
}
