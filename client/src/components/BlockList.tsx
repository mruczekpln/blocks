import Block from './Block'

import { IBlocks } from '../routes/root'
import { IBlock } from '../routes/root'
import { MouseEventHandler } from 'react'

interface BlockListProps {
	className?: string
	blockList: IBlocks
	blockFunctions: {
		update: ({}: IBlock) => void
		delete: (id: string) => void
	}
}

const BlockList = ({ blockList, blockFunctions }: BlockListProps) => {
	return (
		<div className='block-list'>
			{blockList.map((block: IBlock) => {
				return (
					<Block
						key={block.id}
						block={block}
						blockFunctions={{
							update: blockFunctions.update,
							delete: blockFunctions.delete
						}}
					/>
				)
			})}
		</div>
	)
}

export default BlockList
