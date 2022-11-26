import Block from './Block'

import { IBlocks } from '../App'
import { IBlock } from '../App'

interface BlockListProps {
	className?: string
	blockList: IBlocks
	updateBlock: (id: string, num: number) => void
	deleteBlock: (id: string) => void
}

const BlockList = (props: BlockListProps) => {
	return (
		<>
			{props.blockList.map((block: IBlock) => {
				return <Block key={block.id} block={block} updateBlock={props.updateBlock} deleteBlock={props.deleteBlock}></Block>
			})}
		</>
	)
}

export default BlockList
