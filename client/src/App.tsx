import { Route, Routes } from 'react-router-dom'

import Root from './routes/root'
import LogIn from './routes/login'
import Register from './routes/register'

export default function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Root />}></Route>
				<Route path='/login' element={<LogIn />}></Route>
				<Route path='/register' element={<Register />}></Route>
			</Routes>
		</>
	)
}
