export const metadata = {
  title: 'Home',
}

const Homepage = () => {
  return (
    <section className="[min-height:calc(100svh-40px)] md:[min-height:calc(100vh-40px)] flex-center">
      <div className="flex-col gap-6 text-center text-white">
        <h1 className="h1-bold">Welcome to Pulse</h1>
        <p className="max-w-2xl text-lg text-white/70">
          Craft powerful, beautiful surveys that capture authentic responses — then transform raw
          feedback into real‑time analytics, actionable insights, and data‑driven decisions to grow
          your product, engage your audience, and guide your roadmap.
        </p>
      </div>
    </section>
  )
}

export default Homepage
