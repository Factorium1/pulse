const SurveyPage = () => {
  return (
    <div className="flex flex-col mt-10 gap-6 px-4 md:px-8 lg:px-12">
      <div className="h1-bold flex-center">Survey Page</div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex-center flex-col border-2 rounded-lg p-6 m-4">
          <div className="h2-bold">Umfrage</div>
        </div>
        <div className="flex-center flex-col border-2 rounded-lg p-6 m-4">
          <div className="h2-bold">Sampling</div>
        </div>
      </div>
    </div>
  )
}

export default SurveyPage
