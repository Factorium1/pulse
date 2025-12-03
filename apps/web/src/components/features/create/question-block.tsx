'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Maximize2, Minimize2, Plus, Trash2 } from 'lucide-react'
import { QuestionBlockProps, QuestionProps } from '@/types/props'
import QuestionExecuter from './question-executer'
import { useState } from 'react'

const QuestionBlock = ({
  questionBlock,
  addBlockQuestion,
  removeBlockQuestion,
  onChangeBlockQuestion,
  onChangeBlock,
  index,
  onDeleteBlock,
}: {
  questionBlock: QuestionBlockProps
  addBlockQuestion: () => void
  removeBlockQuestion: (questionId: string) => void
  onChangeBlockQuestion: (questionId: string, updatedQuestion: QuestionProps) => void
  onChangeBlock: (updatedBlock: QuestionBlockProps) => void
  index: number
  onDeleteBlock: () => void
}) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false)

  const date = () => {
    return questionBlock.date.split('-').reverse().join('.')
  }

  return (
    <div className="rounded-lg border border-border/70 bg-background/70 p-6 text-center flex-center flex-col gap-4 w-full">
      <div className="flex items-start justify-start w-full flex-col md:flex-row gap-4 md:gap-0 md:justify-between">
        <div className="flex-center flex-row gap-1 lg:gap-2 flex-wrap">
          <p className="text-muted-foreground text-md font-semibold mr-2">Block {index}</p>
          <span className="border border-border/70 bg-card/60 px-4 py-1 rounded-full text-xs text-foreground">
            {date()}
          </span>
          <span className="border border-border/70 bg-card/60 px-4 py-1 rounded-full text-xs text-foreground">
            {questionBlock.time}
          </span>
        </div>
        <div className="flex gap-2 flex-row md:flex-row flex-wrap">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs cursor-pointer"
            onClick={onDeleteBlock}
          >
            <Trash2 className="h-4 w-4" />
            Block löschen
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs cursor-pointer"
            onClick={addBlockQuestion}
          >
            <Plus className="h-4 w-4" />
            Frage hinzufügen
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            {isMinimized ? 'Maximieren' : 'Minimieren'}
          </Button>
        </div>
      </div>
      {!isMinimized && (
        <div className="flex md:items-center md:justify-start gap-2 w-full flex-col md:flex-row">
          <div className="flex-start flex-col gap-1">
            <label htmlFor="block-datum" className="text-sm text-muted-foreground">
              Datum
            </label>
            <Input
              type="date"
              id="block-datum"
              name="block-datum"
              value={questionBlock.date}
              onChange={(e) => onChangeBlock({ ...questionBlock, date: e.target.value })}
              className="text-center md:text-start bg-transparent outline-none text-muted-foreground px-3 py-2 text-sm rounded-lg border border-border/70"
              required
            />
          </div>
          <div className="flex-start flex-col gap-1">
            <label htmlFor="block-uhrzeit" className="text-sm text-muted-foreground">
              Uhrzeit
            </label>
            <Input
              type="time"
              id="block-uhrzeit"
              name="block-uhrzeit"
              value={questionBlock.time}
              onChange={(e) => onChangeBlock({ ...questionBlock, time: e.target.value })}
              className="text-center md:text-start bg-transparent outline-none text-muted-foreground px-3 py-2 text-sm rounded-lg border border-border/70"
              required
            />
          </div>
        </div>
      )}
      {!isMinimized && (
        <QuestionExecuter
          questions={questionBlock.questions}
          onRemoveQuestion={removeBlockQuestion}
          onChangeQuestion={onChangeBlockQuestion}
        />
      )}
    </div>
  )
}

export default QuestionBlock
