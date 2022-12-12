import { Response, Request } from 'express'
import { conn } from '../index'

export const LogIn = async (req: Request, res: Response) => {
	const credentials = req.body

	const [rows]: any = await conn.execute(`SELECT * FROM user WHERE username="${credentials.username}" AND password="${credentials.password}"`)
	if (rows.length > 0) {
		res.send({ success: true })
		console.log(`successfully logged in as ${rows[0].username} of id ${rows[0].id}`)
		return rows[0].id
	} else {
		res.send({ success: false })
		console.log('invalid username or password')
		return
	}
}
