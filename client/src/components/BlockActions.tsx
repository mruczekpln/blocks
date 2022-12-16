import { IBlock } from '../routes/root'
import { IBlockFunctions } from './BlockList'

interface BlockActionsProps {
	block: IBlock
	blockFunctions: IBlockFunctions
}

export function BlockActions({ block, blockFunctions }: BlockActionsProps) {
	const { id, name, amount } = block
	return (
		<>
			<button onClick={() => blockFunctions.update({ id, name, amount: amount + 1 })}>+ 1</button>
			<button onClick={() => blockFunctions.update({ id, name, amount: amount - 1 })}>- 1</button>
			<button onClick={() => blockFunctions.delete(id)}>Delete Block</button>
		</>
	)
}
