import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BlockList from '../components/BlockList'

import { loadBlocks, addBlock, deleteBlock, updateBlock } from '../fetchData'

export interface IBlock {
	id: string
	name: string
	amount: number
}

export interface IBlocks extends Array<IBlock> {}

function Root() {
	const [loggedIn, setLoggedIn] = useState<boolean>(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const [blocks, setBlocks] = useState<IBlocks>([])

	const navigate = useNavigate()

	useEffect(() => {
		loadBlocks().then(data => {
			console.log(data.success)
			if (!data.success) {
				setLoggedIn(false)
				return
			}
			setLoggedIn(true)
			setBlocks(data.data)
		})
	}, [])

	function handleLogOut() {
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
					<BlockList
						className='block-list'
						blockList={blocks}
						blockFunctions={{ update: handleUpdateBlock, delete: handleDeleteBlock }}></BlockList>
					<input type='text' ref={inputRef}></input>
					<button onClick={handleAddBlock}>Add a block!</button>
					<button onClick={handleLogOut}>Log out</button>
				</>
			) : (
				<div>not logged in</div>
			)}
		</div>
	)
}

export default Root
