import { useState } from 'react'

import { IBlock } from '../App'

interface BlockProps {
	className?: string
	block: IBlock
	updateBlock: (id: string, num: number) => void
	deleteBlock: (id: string) => void
}

const Block = (props: BlockProps) => {
	return (
		<>
			{`${props.block.name} `.repeat(props.block.amount)}
			{props.block.id}
			<button onClick={() => props.updateBlock(props.block.id, props.block.amount + 1)}>Add</button>
			<button onClick={() => props.block.amount > 0 && props.updateBlock(props.block.id, props.block.amount - 1)}>Delete</button>
			<button onClick={() => props.deleteBlock(props.block.id)}>Delete Block</button>
		</>
	)
}

export default Block
