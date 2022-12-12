import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BlockList from '../components/BlockList'

import { loadBlocks, addBlock, deleteBlock, updateBlock, logOut } from '../fetchData'

export interface IBlock {
	id: string
	name: string
	amount: number
}

export interface IBlocks extends Array<IBlock> {}

export default function Root() {
	const [loggedIn, setLoggedIn] = useState<boolean>(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const [blocks, setBlocks] = useState<IBlocks>([])

	const navigate = useNavigate()

	useEffect(() => {
		handleLoadBlocks()
	}, [])

	async function handleLoadBlocks() {
		loadBlocks().then(data => {
			console.log(data.success)
			if (!data.success) {
				setLoggedIn(false)
				return
			}
			setLoggedIn(true)
			setBlocks(data.data)
		})
	}

	function handleLogOut() {
		logOut()
		navigate('login')
	}

	function handleAddBlock() {
		addBlock(blocks, String(inputRef.current?.value))
			.then(data => setBlocks(data))
			.catch(err => console.log('ADDBLOCK ERR', err))
	}

	function handleDeleteBlock(id: string) {
		deleteBlock(blocks, id)
			.then(data => setBlocks(data))
			.catch(err => console.log('DELETEBLOCK ERR', err))
	}

	function handleUpdateBlock({ id, name, amount }: IBlock) {
		updateBlock(blocks, id, name, amount)
			.then(data => setBlocks(data))
			.catch(err => console.log('UPDATEBLOCK ERR', err))
	}

	return (
		<div className='App'>
			{loggedIn ? (
				<>
					{blocks.length > 0 ? (
						<>
							<BlockList
								className='block-list'
								blockList={blocks}
								blockFunctions={{ update: handleUpdateBlock, delete: handleDeleteBlock }}></BlockList>
						</>
					) : (
						<div>no blocks</div>
					)}

					<input type='text' ref={inputRef}></input>
					<button onClick={handleAddBlock}>Add a block!</button>
					<button onClick={handleLogOut}>Log out</button>
				</>
			) : (
				<>
					<div>not logged in</div>
					<Link to={'/login'}>
						<button>Log In</button>
					</Link>
				</>
			)}
		</div>
	)
}
