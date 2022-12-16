import { IBlock, IBlocks } from '../routes/root'
import { IBlockFunctions } from './BlockList'
import { BlockActions } from './BlockActions'

interface BlockProps {
	onAdmin: boolean
	block: IBlock
	blockFunctions: IBlockFunctions
}

const Block = ({ onAdmin, block, blockFunctions }: BlockProps) => {
	const { id, name, amount } = block
	return (
		<div className={`${id} block`}>
			<p>{'text: ' + `${name}`.repeat(amount)}</p>
			<p className='block-id'>{`id: ${id}`}</p>
			<div className='actions'>
				{!onAdmin ? (
					<BlockActions block={block} blockFunctions={blockFunctions} />
				) : (
					<button onClick={() => blockFunctions.delete(id)}>Delete Block</button>
				)}
			</div>
		</div>
	)
}

export default Block
