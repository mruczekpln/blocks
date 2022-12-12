import { IBlock } from '../routes/root'
import { MouseEventHandler } from 'react'

interface BlockProps {
	onAdmin: boolean
	block: IBlock
	blockFunctions: {
		update: (block: IBlock) => void | any
		delete: (id: string) => void | any
	}
}

const Block = ({ onAdmin, block: { id, name, amount }, blockFunctions }: BlockProps) => {
	return (
		<div className={`${id} block`}>
			<p>
				{'text: ' + `${name}`.repeat(amount)}
				<br />
				{`id: ${id}`}
			</p>
			<div className='actions'>
				{!onAdmin && (
					<>
						<button onClick={() => blockFunctions.update({ id, name, amount: amount + 1 })}>Add</button>
						<button onClick={() => blockFunctions.update({ id, name, amount: amount - 1 })}>Delete</button>
					</>
				)}
				<button onClick={() => blockFunctions.delete(id)}>Delete Block</button>
			</div>
		</div>
	)
}

export default Block
