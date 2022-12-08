import { useState, useRef, useEffect, FormEvent } from 'react'
import BlockList from './components/BlockList'

import { logIn, loadBlocks, addBlock, deleteBlock, updateBlock } from './fetchData'

export interface IBlock {
	id: string
	name: string
	amount: number
}

export interface IBlocks extends Array<IBlock> {}

export interface ILoginCredentials {
	username: string
	password: string
}

function App() {
	const [loggedIn, setLoggedIn] = useState<boolean>(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const [blocks, setBlocks] = useState<IBlocks>([])

	const usernameRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		// logIn()
		// loadBlocks()
		// 	.then(data => setBlocks(data))
		// 	.catch(err => console.log('loadBlocks ERROR', err))
	}, [])

	function handleLogIn(e: FormEvent) {
		const credentials: ILoginCredentials = {
			username: usernameRef.current!.value,
			password: passwordRef.current!.value
		}

		e.preventDefault()

		logIn(credentials)
			.then(res => setLoggedIn(res?.loggedIn))
			.then(() => loadBlocks().then(data => setBlocks(data)))
			.catch(err => console.log('LOGIN ERR', err))
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
				</>
			) : (
				<form className='login-form' onSubmit={handleLogIn}>
					<input type='text' ref={usernameRef} />
					<input type='password' ref={passwordRef} />
					<button type='submit'>login</button>
				</form>
			)}
		</div>
	)
}

export default App
