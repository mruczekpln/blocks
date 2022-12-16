import { FormEvent, useRef } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { register } from '../fetchData'
import { ILoginCredentials } from './login'

export default function Register() {
	const usernameRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	const repeatPasswordRef = useRef<HTMLInputElement>(null)

	const navigate = useNavigate()

	function handleRegister(e: FormEvent) {
		e.preventDefault()

		console.log(passwordRef.current, repeatPasswordRef.current)
		if (passwordRef.current!.value === repeatPasswordRef.current!.value) {
			const credentials: ILoginCredentials = {
				username: usernameRef.current!.value,
				password: usernameRef.current!.value
			}

			register(credentials).then(data => {
				if (data) {
					console.log('successfully registered')
					navigate('/login')
				}
			})
		} else {
			alert('Passwords must be the same!')
		}
	}

	return (
		<main>
			<h3>Register Page</h3>
			<form className='login-form' onSubmit={handleRegister}>
				<input type='text' ref={usernameRef} placeholder='username' />
				<input type='text' ref={passwordRef} placeholder='password' />
				<input type='text' ref={repeatPasswordRef} placeholder='repeat password' />

				<div>
					<button type='submit'>Register</button>
					<Link to='/login'>
						<button
							style={{
								width: '100%'
							}}>
							Login
						</button>
					</Link>
				</div>
			</form>
		</main>
	)
}
