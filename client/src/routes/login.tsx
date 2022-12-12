import { FormEvent, useRef } from 'react'
import { logIn } from '../fetchData'

import { Link, useNavigate } from 'react-router-dom'

export interface ILoginCredentials {
	username: string
	password: string
}

export default function LogIn() {
	const usernameRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const navigate = useNavigate()

	async function handleLogIn(e: FormEvent) {
		const credentials: ILoginCredentials = {
			username: usernameRef.current!.value,
			password: passwordRef.current!.value
		}

		e.preventDefault()

		logIn(credentials)
			.then(data => {
				if (data) {
					console.log('redirecting')
					navigate('/')
				} else console.log('not logged in')
			})
			.catch(err => console.log('LOGIN ERR', err))
	}

	return (
		<>
			<form className='login-form' onSubmit={handleLogIn}>
				<input type='text' ref={usernameRef} />
				<input type='password' ref={passwordRef} />
				<button type='submit'>login</button>
			</form>

			<Link to='/register'>
				<button>Register</button>
			</Link>
		</>
	)
}
