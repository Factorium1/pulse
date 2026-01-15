import { Question } from '@prisma/client'

const TextQuestion = ({
  question,
  value,
  onChange,
}: {
  question: Question
  value: string
  onChange: (value: string) => void
}) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex-start gap-2 flex-col">
        <h2 className="h2-bold">{question.title}</h2>
        {question.description && (
          <p className="text-muted-foreground text-sm">{question.description}</p>
        )}
      </div>
      <div className="flex-start gap-4 flex-col w-full">
        <textarea
          name="text"
          id="text"
          rows={10}
          placeholder="Text eingeben..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border-2 border-accent rounded-lg p-2 resize-none overflow-hidden"
        />
      </div>
    </div>
  )
}

export default TextQuestion
