import { useRef, useState } from 'react'
import { v4 } from 'uuid'

import BlockList from './components/BlockList'
import './styles/App.css'

export interface IBlock {
	id: string
	name: string
	amount: number
}

export interface IBlocks extends Array<IBlock> {}

function App() {
	const [blocks, setBlocks] = useState<IBlocks>([])
	const inputRef = useRef<HTMLInputElement>(null)

	const addBlock = async () => {
		const newBlock: IBlock = {
			id: v4(),
			name: inputRef.current?.value || '',
			amount: 1
		}
		setBlocks([...blocks, newBlock])

		const res = await fetch('http://localhost:5000/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Headers': '*'
			},
			body: JSON.stringify(newBlock)
		})

		const data = await res.json()
		console.log(data)
	}

	const updateBlock = (id: string, num: number) => {
		const target = blocks[blocks.findIndex(block => block.id === id)]
		setBlocks([
			...blocks.filter(block => block.id !== id),
			{
				id: target.id,
				name: target.name,
				amount: num
			}
		])
	}

	const deleteBlock = async (id: string) => {
		setBlocks(blocks.filter(block => block.id !== id))

		const res = await fetch('http://localhost:5000/delete', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Headers': '*'
			},
			body: JSON.stringify({
				id: id
			})
		})

		const data = await res.json()
		console.log(data)
	}

	return (
		<div className='App'>
			<BlockList className='block-list' blockList={blocks} updateBlock={updateBlock} deleteBlock={deleteBlock}></BlockList>
			<input type='text' ref={inputRef}></input>
			<button onClick={addBlock}>Add a block!</button>
		</div>
	)
}

export default App
