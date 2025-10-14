import Card from '@/components/shared/web/card'
export const metadata = {
  title: 'Home',
}

const Homepage = () => {
  return (
    <>
      <section
        id="home"
        className="min-h-[100dvh] md:min-h-[100vh] flex items-center justify-center px-6"
      >
        <div className="max-w-2xl mx-auto flex flex-col gap-6 text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Welcome to Pulse
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/80">
            Craft powerful, beautiful surveys that capture authentic responses — then transform raw
            feedback into real‑time analytics, actionable insights, and data‑driven decisions to
            grow your product, engage your audience, and guide your roadmap.
          </p>
        </div>
      </section>
      <section id="features" className="min-h-[100dvh] md:min-h-[100vh]">
        <div className="max-w-3xl mx-auto flex items-center justify-center flex-col text-center gap-3 text-slate-950 px-6 py-30">
          <h2 className="text-2xl md:text-3xl font-bold">Funktionen</h2>
          <p className="text-base md:text-lg max-w-2xl">
            Alles, was Sie für aufschlussreiche Umfragen benötigen, in einer intuitiven App.
          </p>
        </div>
      </section>
    </>
  )
}

export default Homepage
