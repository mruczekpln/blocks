import Block from './Block'

import { IBlocks } from '../routes/root'
import { IBlock } from '../routes/root'

export interface IBlockFunctions {
	update: (block: IBlock) => void | any
	delete: (id: string) => void | any
}
interface BlockListProps {
	className?: string
	onAdmin: boolean
	blocks: IBlocks
	blockFunctions: IBlockFunctions
}

const BlockList = ({ onAdmin, blocks, blockFunctions }: BlockListProps) => {
	return (
		<div className='block-list'>
			{blocks.length > 0 ? (
				blocks.map((block: IBlock) => {
					return (
						<Block
							key={block.id}
							onAdmin={onAdmin}
							block={block}
							blockFunctions={{
								update: blockFunctions.update,
								delete: blockFunctions.delete
							}}
						/>
					)
				})
			) : (
				<p>no blocks :(</p>
			)}
		</div>
	)
}

export default BlockList
