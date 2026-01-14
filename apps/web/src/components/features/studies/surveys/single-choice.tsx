'use client'

const SingleChoice = ({
  title,
  description,
  options = [],
}: {
  title: string
  description: string
  options: string[]
}) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex-start gap-2 flex-col">
        <h2 className="h2-bold">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="flex-start gap-4 flex-col w-full">
        {options.map((option, index) => (
          <button
            key={option}
            onClick={}
            className="cursor-pointer w-full border-2 border-muted-foreground rounded-md p-4 hover:bg-accent hover:border-accent-foreground transition"
          >
            <p className="text-center text-lg font-medium">{option}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SingleChoice
