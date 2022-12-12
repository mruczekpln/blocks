import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root'
import LogIn from './routes/login'
import './styles/index.css'

import App from './App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<BrowserRouter>
		<App></App>
	</BrowserRouter>
)
