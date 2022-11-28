import { useState, useRef, useEffect } from 'react'
import BlockList from './components/BlockList'

import { loadBlocks, addBlock, deleteBlock, updateBlock } from './fetchData'

export interface IBlock {
	id: string
	name: string
	amount: number
}

export interface IBlocks extends Array<IBlock> {}

function App() {
	const inputRef = useRef<HTMLInputElement>(null)
	const [blocks, setBlocks] = useState<IBlocks>([])

	useEffect(() => {
		loadBlocks()
			.then(data => setBlocks(data))
			.catch(err => console.log('loadBlocks ERROR', err))
	}, [])

	function handleAddBlock() {
		addBlock(blocks, String(inputRef.current?.value)).then(data => setBlocks(data))
	}

	function handleDeleteBlock(id: string) {
		deleteBlock(blocks, id).then(data => setBlocks(data))
	}

	function handleUpdateBlock({ id, name, amount }: IBlock) {
		updateBlock(blocks, id, name, amount).then(data => setBlocks(data))
		// .then(data => setBlocks(data))
	}

	// function handleUpdateblock(id: string, num: number) {
	// 	updateBlock(blocks, id, num).then(data => setBlocks(data))
	// }

	return (
		<div className='App'>
			<BlockList
				className='block-list'
				blockList={blocks}
				blockFunctions={{ update: handleUpdateBlock, delete: handleDeleteBlock }}></BlockList>
			<input type='text' ref={inputRef}></input>
			<button onClick={handleAddBlock}>Add a block!</button>
		</div>
	)
}

export default App
