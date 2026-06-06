export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f2e8] px-4 py-5 text-stone-950 sm:px-6">
      <main className="mx-auto flex min-h-[calc(100vh-40px)] w-full max-w-md flex-col rounded-[2rem] border border-stone-200 bg-[#fffaf0] p-5 shadow-2xl shadow-stone-300/50 sm:max-w-2xl sm:p-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-600">
              Hackathon MVP
            </p>
            <h1 className="mt-2 text-3xl font-black leading-none tracking-tight sm:text-5xl">
              Mobile-first founder prototype
            </h1>
          </div>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-stone-950 text-lg font-black text-orange-300">
            01
          </div>
        </header>

        <section className="mt-8 rounded-3xl bg-stone-950 p-5 text-[#fffaf0]">
          <p className="text-sm font-medium text-orange-200">One-line pitch</p>
          <p className="mt-3 text-2xl font-bold leading-tight">
            Replace this with the sharpest version of your product promise.
          </p>
          <button className="mt-6 w-full rounded-2xl bg-orange-400 px-5 py-4 text-base font-bold text-stone-950 shadow-lg shadow-orange-950/20 transition hover:bg-orange-300">
            Start demo flow
          </button>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["Problem", "What painful job does your user need solved?"],
            ["Input", "What does the user give the product first?"],
            ["Result", "What valuable output do they receive?"],
          ].map(([title, copy]) => (
            <article
              className="rounded-3xl border border-stone-200 bg-white/70 p-4"
              key={title}
            >
              <h2 className="font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">{copy}</p>
            </article>
          ))}
        </section>

        <section className="mt-auto pt-8">
          <div className="rounded-3xl border border-dashed border-stone-300 p-4">
            <p className="text-sm font-bold">Build stack</p>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Next.js, TypeScript, Tailwind CSS, Supabase, and Vercel. Add
              shadcn/ui components when the first screens are defined.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
