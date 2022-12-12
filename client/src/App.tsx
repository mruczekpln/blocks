import { Route, Routes } from 'react-router-dom'

import Root from './routes/root'
import LogIn from './routes/login'
import Register from './routes/register'
import AdminDashboard from './routes/admin'

export default function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Root />}></Route>
				<Route path='/login' element={<LogIn />}></Route>
				<Route path='/register' element={<Register />}></Route>
				<Route path='/admin' element={<AdminDashboard />}></Route>
			</Routes>
		</>
	)
}
