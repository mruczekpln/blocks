import { Request, Response } from 'express'

export function LogOut(req: Request, res: Response) {
	res.clearCookie('token')
	res.send({
		operation: 'LogOut',
		success: true
	})
}
