'use client'

import QuestionBlock from './question-block'
import { QuestionBlockProps, QuestionProps } from '@/types/props'

const BlockExecuter = ({
  questionBlocks,
  onAddBlockQuestion,
  onRemoveBlockQuestion,
  onChangeBlockQuestion,
  onChangeBlock,
}: {
  questionBlocks: QuestionBlockProps[]
  onAddBlockQuestion: (blockId: string) => void
  onRemoveBlockQuestion: (blockId: string, questionId: string) => void
  onChangeBlockQuestion: (
    blockId: string,
    questionId: string,
    updatedQuestion: QuestionProps,
  ) => void
  onChangeBlock: (blockId: string, updatedBlock: QuestionBlockProps) => void
}) => {
  return (
    <div className="w-full flex-center flex-col gap-4">
      {questionBlocks.map((block) => (
        <QuestionBlock
          key={block.id}
          questionBlock={block}
          addBlockQuestion={() => onAddBlockQuestion(block.id)}
          removeBlockQuestion={(questionId) => onRemoveBlockQuestion(block.id, questionId)}
          onChangeBlockQuestion={(questionId, updatedQuestion) =>
            onChangeBlockQuestion(block.id, questionId, updatedQuestion)
          }
          onChangeBlock={(updatedBlock) => onChangeBlock(block.id, updatedBlock)}
        />
      ))}
    </div>
  )
}

export default BlockExecuter
