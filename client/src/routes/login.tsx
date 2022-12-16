import { FormEvent, useEffect, useInsertionEffect, useRef } from 'react'
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

	useEffect(() => {
		// if (document.cookie.includes('token')) navigate('/')
	}, [])

	async function handleLogIn(e: FormEvent) {
		const credentials: ILoginCredentials = {
			username: usernameRef.current!.value,
			password: passwordRef.current!.value
		}

		e.preventDefault()

		logIn(credentials)
			.then(data => {
				if (data?.success) {
					if (data.admin) navigate('/admin')
					else navigate('/')
				} else console.log('not logged in')
			})
			.catch(err => console.log('LOGIN ERR', err))
	}

	return (
		<main>
			<h3>LogIn Page</h3>
			<form className='login-form' onSubmit={handleLogIn}>
				<input type='text' name='username' placeholder='username' ref={usernameRef} />
				<input type='password' name='password' placeholder='password' ref={passwordRef} />

				<div>
					<button type='submit'>Login</button>
					<Link to='/register'>
						<button
							style={{
								width: '100%'
							}}>
							Register
						</button>
					</Link>
				</div>
			</form>
		</main>
	)
}
