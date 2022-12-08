import { IBlock, IBlocks, ILoginCredentials } from './App'
import { v4 } from 'uuid'

async function logIn(credentials: ILoginCredentials) {
	const res = await fetch('http://localhost:5000/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': '*'
		},
		body: JSON.stringify(credentials)
	})

	const data = await res.json()
	console.log(data)
	return data
}

async function loadBlocks() {
	const res = await fetch('http://localhost:5000/load', {
		method: 'POST'
	})

	console.log(res)
	const data = await res.json()
	console.log(data)
	return data
}

async function addBlock(blocks: IBlocks, name: string) {
	const newBlock: IBlock = {
		id: v4(),
		name: name,
		amount: 1
	}

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

	return [...blocks, newBlock]
}

async function updateBlock(blocks: IBlocks, id: string, name: string, num: number) {
	const target = blocks[blocks.findIndex(block => block.id === id)]
	const newBlock: IBlock = {
		id: target.id,
		name: name,
		amount: num
	}

	const res = await fetch('http://localhost:5000/update', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': '*',
			'Access-Control-Allow-Methods': 'PUT'
		},
		body: JSON.stringify(newBlock)
	})

	const data = await res.json()
	console.log(data)

	return [...blocks.filter(block => block.id !== id), newBlock]
}

async function deleteBlock(blocks: IBlocks, id: string) {
	const res = await fetch('http://localhost:5000/delete', {
		method: 'DELETE',
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

	return blocks.filter(block => block.id !== id)
}

export { logIn, loadBlocks, addBlock, updateBlock, deleteBlock }
