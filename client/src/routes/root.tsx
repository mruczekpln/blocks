import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BlockList from '../components/BlockList'

import { addBlock, deleteBlock, loadBlocks, logOut, updateBlock } from '../fetchData'

export interface IBlock {
	id: string
	name: string
	amount: number
}

export interface IBlocks extends Array<IBlock> {}

export default function Root() {
	const [blocks, setBlocks] = useState<IBlocks>([])
	const [loggedIn, setLoggedIn] = useState<boolean>(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const promptRef = useRef('not logged in')

	const navigate = useNavigate()

	useEffect(() => {
		handleLoadBlocks()
	}, [])

	const handleTokenExpiration = (data: any) => {
		console.log('data in handletoken expiration', JSON.stringify(data))
		if (!data.result.success) {
			promptRef.current = 'your session expired, if you want to continiue log in again'
			setLoggedIn(false)
			// document.cookie = String(document.cookie.split(';').filter(key => !key.includes('token')))
			return
		}

		return data.data
	}

	async function handleLoadBlocks() {
		if (document.cookie.includes('token')) {
			setLoggedIn(true)
			loadBlocks().then(data => {
				// console.log('setted blocks', typeof setBlocks)
				setBlocks(data.data)
			})
		} else {
			setLoggedIn(false)
		}
	}

	const handleAddBlock = async (name: string) => {
		addBlock(blocks, name)
			.then(data => handleTokenExpiration(data))
			.then(data => setBlocks(data))
	}

	const handleUpdateBlock = async ({ id, name, amount }: IBlock) => {
		if (amount >= 0) {
			const newBlock: IBlock = {
				id: id,
				name: name,
				amount: amount
			}

			updateBlock(blocks, newBlock)
				.then(data => handleTokenExpiration(data))
				.then(data => setBlocks(data))
		}
	}

	const handleDeleteBlock = async (id: string) => {
		deleteBlock(blocks, id)
			.then(data => handleTokenExpiration(data))
			.then(data => setBlocks(data))
	}

	function handleLogOut() {
		logOut().then(data => {
			console.log(data)
			document.cookie = String(document.cookie.split(';').filter(key => !key.includes('token')))
			navigate('login')
		})
	}

	return (
		<div className='App'>
			<main>
				<div className='main-blocks'>
					{loggedIn ? (
						<>
							<BlockList
								className='block-list'
								onAdmin={false}
								blocks={blocks}
								blockFunctions={{ update: handleUpdateBlock, delete: handleDeleteBlock }}></BlockList>

							<input type='text' ref={inputRef} placeholder='block name'></input>
							<button onClick={() => handleAddBlock(inputRef.current!.value)}>Add a block!</button>
							<button onClick={handleLogOut}>Log out</button>
						</>
					) : (
						<>
							<div>{promptRef.current}</div>

							<Link to={'/login'}>
								<button>Log In</button>
							</Link>
						</>
					)}
				</div>
			</main>
		</div>
	)
}
