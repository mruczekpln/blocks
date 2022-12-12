import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import BlockList from '../components/BlockList'
import { deleteBlock, updateBlock } from '../fetchData'
import { IBlock } from './root'

export default function AdminDashboard() {
	const [data, setData] = useState([])

	const navigate = useNavigate()

	useEffect(() => {
		fetchAdminData().then(data => setData(data))
		console.log('useeffect')
	}, [])

	async function fetchAdminData() {
		const res = await fetch('http://localhost:5000/admin', {
			method: 'POST'
		})

		const data = await res.json()
		console.log(data)

		return data
	}

	function handleDeleteBlock(id: string) {
		deleteBlock([], id)
		navigate('/admin')
	}
	function handleUpdateBlock({ id, name, amount }: IBlock) {
		updateBlock([], id, name, amount)
		navigate('/admin')
	}

	return (
		<div>
			<h1>Admin Dashboard</h1>

			{data.map((item: any) => (
				<div>
					<h2>{item.username}</h2>
					<BlockList
						className='block-list'
						onAdmin={true}
						blockList={item.rows}
						blockFunctions={{ update: handleUpdateBlock, delete: handleDeleteBlock }}></BlockList>
				</div>
			))}
		</div>
	)
}
