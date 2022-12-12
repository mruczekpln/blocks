import Block from './Block'

import { IBlocks } from '../routes/root'
import { IBlock } from '../routes/root'
import { MouseEventHandler } from 'react'

interface BlockListProps {
	className?: string
	onAdmin: boolean
	blockList: IBlocks
	blockFunctions: {
		update: (({}: IBlock) => void) | any
		delete: ((id: string) => void) | any
	}
}

const BlockList = ({ onAdmin, blockList, blockFunctions }: BlockListProps) => {
	return (
		<div className='block-list'>
			{blockList.map((block: IBlock) => {
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
			})}
		</div>
	)
}

export default BlockList
