import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { IBlock, IBlocks } from './routes/root'
import { ILoginCredentials } from './routes/login'
import axios from 'axios'

async function logIn(credentials: ILoginCredentials) {
	const { data } = await axios.post('http://localhost:5000/login', credentials, {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': '*',
			'Access-Control-Allow-Credentials': 'true'
		},
		withCredentials: true
	})

	console.log('login', data)

	if (data.success) return data
}

async function logOut() {
	const { data } = await axios.get('http://localhost:5000/logout', {
		withCredentials: true
	})
	return data
}

async function register(credentials: ILoginCredentials) {
	const res = await fetch('http://localhost:5000/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': '*'
		},
		body: JSON.stringify(credentials)
	})

	const data = await res.json()
	console.log(data)

	if (data.success) return data.success
}

async function loadBlocks() {
	const { data } = await axios.post('http://localhost:5000/load', null, {
		withCredentials: true
	})
	console.log(data)

	if (data?.success) return data
	else return false
}

async function fetchAdminData() {
	const { data } = await axios.post('http://localhost:5000/admin', null, {
		withCredentials: true
	})
	console.log(data)

	return data
}
async function addBlock(blocks: IBlocks, name: string) {
	const newBlock: IBlock = {
		id: v4(),
		name: name,
		amount: 1
	}

	const { data } = await axios.post('http://localhost:5000/add', newBlock, {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': '*',
			'Access-Control-Allow-Credentials': 'true'
		},
		withCredentials: true
	})

	console.log(data)

	return { result: data, data: [...blocks, newBlock] }
}

async function updateBlock(blocks: IBlocks, newBlock: IBlock) {
	const { data } = await axios.put('http://localhost:5000/update', newBlock, {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': '*',
			'Access-Control-Allow-Credentials': 'true'
		},
		withCredentials: true
	})

	console.log(data)
	return {
		result: data,
		data: [...blocks.map(block => (block.id !== newBlock.id ? block : newBlock))]
	}
}

async function deleteBlock(blocks: IBlocks, id: string) {
	const { data } = await axios.delete('http://localhost:5000/delete', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': '*',
			'Access-Control-Allow-Credentials': 'true'
		},
		data: { id: id },
		withCredentials: true
	})

	console.log(data)

	console.log(id)
	console.log(blocks)
	return { result: data, data: [...blocks.filter(block => block.id !== id)] }
}

export { logIn, logOut, register, loadBlocks, addBlock, updateBlock, deleteBlock, fetchAdminData }
