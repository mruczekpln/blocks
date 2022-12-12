import { conn } from './../index'
import { Request, Response } from 'express'

export const Register = async (req: Request, res: Response) => {
	const credentials = req.body

	try {
		conn.execute(`INSERT INTO user (username, password) VALUES ("${credentials.username}", "${credentials.password}")`)
	} catch (err) {
		console.log(err)
	}

	console.log(`successfully registered as ${credentials.username}`)
	res.send({ success: true })
}
