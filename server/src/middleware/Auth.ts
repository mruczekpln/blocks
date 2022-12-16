import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

export function Auth(req: Request, res: Response, next: NextFunction) {
	const token = req.cookies?.token

	try {
		const result: any = jwt.verify(token, process.env.JWT_SECRET!)

		if (token) {
			res.locals.user_id = result.user_id
			next()
		}
	} catch (err) {
		res.clearCookie('token')
		res.send({
			operation: 'Auth',
			success: false
		})
	}
}
