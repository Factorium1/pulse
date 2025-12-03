'use client'

import { CheckCircle } from 'lucide-react'
import QuestionBlock from './question-block'
import { QuestionBlockProps, QuestionProps } from '@/types/props'

const BlockExecuter = ({
  questionBlocks,
  onAddBlockQuestion,
  onRemoveBlockQuestion,
  onChangeBlockQuestion,
  onChangeBlock,
  onDeleteBlock,
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
  onDeleteBlock: (blockId: string) => void
}) => {
  return (
    <div className="w-full flex-center flex-col gap-4">
      {questionBlocks.length === 0 ? (
        <div className="flex-center flex-col gap-2 px-5 lg:px-20 py-10">
          <CheckCircle className="h-8 w-8 text-emerald-500" />
          <p className="text-sm text-muted-foreground text-center">
            Es wurden noch keine Blöcke hinzugefügt. Klicke auf "Block hinzufügen", um zu beginnen
          </p>
        </div>
      ) : (
        questionBlocks.map((block, index) => (
          <QuestionBlock
            key={block.id}
            questionBlock={block}
            addBlockQuestion={() => onAddBlockQuestion(block.id)}
            removeBlockQuestion={(questionId) => onRemoveBlockQuestion(block.id, questionId)}
            onChangeBlockQuestion={(questionId, updatedQuestion) =>
              onChangeBlockQuestion(block.id, questionId, updatedQuestion)
            }
            onChangeBlock={(updatedBlock) => onChangeBlock(block.id, updatedBlock)}
            index={index + 1}
            onDeleteBlock={() => onDeleteBlock(block.id)}
          />
        ))
      )}
    </div>
  )
}

export default BlockExecuter
