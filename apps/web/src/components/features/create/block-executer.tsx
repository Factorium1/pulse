'use client'

import QuestionBlock from './question-block'
import { QuestionBlockProps } from '@/types/props'

const BlockExecuter = ({
  questionBlocks,
  onAddBlockQuestion,
  onRemoveBlockQuestion,
}: {
  questionBlocks: QuestionBlockProps[]
  onAddBlockQuestion: (blockId: string) => void
  onRemoveBlockQuestion: (blockId: string, questionId: string) => void
}) => {
  return (
    <div className="w-full flex-center flex-col gap-4">
      {questionBlocks.map((block) => (
        <QuestionBlock
          key={block.id}
          questionBlock={block}
          addBlockQuestion={() => onAddBlockQuestion(block.id)}
          removeBlockQuestion={(questionId) => onRemoveBlockQuestion(block.id, questionId)}
        />
      ))}
    </div>
  )
}

export default BlockExecuter
