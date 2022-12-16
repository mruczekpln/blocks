import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import BlockList from '../components/BlockList'
import { fetchAdminData } from '../fetchData'
import { deleteBlock, updateBlock } from '../fetchData'
import { IBlock } from './root'

export default function AdminDashboard() {
	const [data, setData] = useState([])

	const navigate = useNavigate()

	useEffect(() => {
		console.log(document.cookie)
		handleFetchAdminData()
	}, [])

	const handleFetchAdminData = async () => {
		fetchAdminData().then(data => setData(data))
	}

	function handleDeleteBlock(id: string) {
		deleteBlock([], id).then(() => handleFetchAdminData())
	}

	// const handleDeleteBlock = async (id: string) => {
	// 	deleteBlock(blocks, id)
	// 		.then(data => handleTokenExpiration(data))
	// 		.then(data => setBlocks(data))
	// }

	function handleUpdateBlock({ id, name, amount }: IBlock) {
		// updateBlock([], id, name, amount)
		// navigate('/admin')
	}

	return (
		<main>
			<h1>Admin Dashboard</h1>

			{data.map((item: any) => (
				<div
					// className='admin-user'
					className='main-blocks'>
					<h2>{item.username}</h2>
					<BlockList
						className='block-list'
						onAdmin={true}
						blocks={item.rows}
						blockFunctions={{ update: handleUpdateBlock, delete: handleDeleteBlock }}></BlockList>
				</div>
			))}
		</main>
	)
}
