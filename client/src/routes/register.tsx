import { FormEvent, useRef } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { register } from '../fetchData'
import { ILoginCredentials } from './login'

export default function Register() {
	const usernameRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const navigate = useNavigate()

	function handleRegister(e: FormEvent) {
		const credentials: ILoginCredentials = {
			username: usernameRef.current!.value,
			password: usernameRef.current!.value
		}

		e.preventDefault()

		register(credentials).then(data => {
			if (data) {
				console.log('successfully registered')
				navigate('/login')
			}
		})
	}

	return (
		<form onSubmit={handleRegister}>
			<input type='text' ref={usernameRef} />
			<input type='text' ref={passwordRef} />
			<button type='submit'>register</button>
		</form>
	)
}
