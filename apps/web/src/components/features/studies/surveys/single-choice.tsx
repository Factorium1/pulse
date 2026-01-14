const SingleChoice = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex-start gap-2 flex-col">
        <h2 className="h2-bold">Wie gestresst fühlen Sie sich momentan?</h2>
        <p className="text-muted-foreground text-sm">
          Bitte wählen Sie die Option, die am besten zu Ihrer Empfindung passt, wobei 1 "sehr
          entspannt" und 5 "extrem gestresst" bedeutet.
        </p>
      </div>
      <div className="flex-start gap-4 flex-col w-full">
        {[1, 2, 3, 4, 5].map((option) => (
          <button
            key={option}
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
