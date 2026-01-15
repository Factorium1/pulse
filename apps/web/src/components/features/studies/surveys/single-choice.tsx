'use client'

import { QuestionComponentProps } from './manage-page'

const SingleChoiceQuestion = ({ question, value, onChange }: QuestionComponentProps<string>) => {
  const options = question.options || []
  const selected = value

  function toggle(option: string) {
    const next = selected === option ? '' : option

    onChange(next)
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex-start gap-2 flex-col">
        <h2 className="h2-bold">{question.title}</h2>
        {question.description && (
          <p className="text-muted-foreground text-sm">{question.description}</p>
        )}
      </div>
      <div className="flex-start gap-4 flex-col w-full">
        {options.map((option) => {
          const isSelected = selected === option

          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={`w-full border-2 rounded-md p-4 cursor-pointer ${
                isSelected
                  ? 'bg-accent border-accent-foreground'
                  : 'hover:border-muted-foreground hover:bg-accent'
              }`}
            >
              <p className="text-center text-lg font-medium">{option}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SingleChoiceQuestion
