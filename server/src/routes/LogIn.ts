import { Response, Request } from 'express'
import jwt from 'jsonwebtoken'
import { conn } from '../index'
import { config } from 'dotenv'
config()

export const LogIn = async (req: Request, res: Response) => {
	const credentials = req.body

	const [rows]: any = await conn.execute(`SELECT * FROM user WHERE username="${credentials.username}" AND password="${credentials.password}"`)
	if (rows.length > 0) {
		const token = jwt.sign({ user_id: rows[0].id, username: rows[0].username }, process.env.JWT_SECRET!, { expiresIn: '15min' })

		res.cookie('token', token)

		if (credentials.username === 'admin') {
			res.send({ success: true, admin: true })
			console.log('welcome ADMIN')
		} else {
			console.log(`successfully logged in as ${rows[0].username} of id ${rows[0].id}`)
			res.send({
				success: true,
				admin: false
			})
			return { jwt_token: token, username: credentials.username, user_id: rows[0].id, isAdmin: false }
		}
	} else {
		res.send({ success: false })
		console.log('invalid username or password')
		return
	}
}
