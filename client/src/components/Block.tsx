import { IBlock } from '../App'
import { MouseEventHandler } from 'react'

interface BlockProps {
	block: IBlock
	blockFunctions: {
		update: (block: IBlock) => void
		delete: (id: string) => void
	}
}

const Block = ({ block: { id, name, amount }, blockFunctions }: BlockProps) => {
	return (
		<div className={`${id} block`}>
			<p>
				{'text: ' + `${name}`.repeat(amount)}
				<br />
				{`id: ${id}`}
			</p>
			<div className='actions'>
				<button onClick={() => blockFunctions.update({ id, name, amount: amount + 1 })}>Add</button>
				<button onClick={() => blockFunctions.update({ id, name, amount: amount - 1 })}>Delete</button>
				<button onClick={() => blockFunctions.delete(id)}>Delete Block</button>
			</div>
		</div>
	)
}

export default Block
