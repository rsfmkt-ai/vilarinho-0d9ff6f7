import { useRef } from "react";
import { practices } from "@/lib/site-data";

export function PracticeCarousel() {
  const ref = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section id="atuacao" aria-labelledby="atuacao-titulo" className="scroll-mt-16 bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="reveal flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">Áreas de prática</p>
            <h2 id="atuacao-titulo" className="mt-3 text-4xl font-light md:text-5xl">Atuação<span className="text-highlight">.</span></h2>
          </div>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={() => scroll(-1)} aria-label="Áreas anteriores" className="grid h-11 w-11 place-items-center rounded-full border border-line text-primary transition-colors hover:bg-primary hover:text-primary-foreground">←</button>
            <button type="button" onClick={() => scroll(1)} aria-label="Próximas áreas" className="grid h-11 w-11 place-items-center rounded-full border border-line text-primary transition-colors hover:bg-primary hover:text-primary-foreground">→</button>
          </div>
        </div>
      </div>

      <ul
        ref={ref}
        aria-label="Áreas de atuação — role para o lado"
        tabIndex={0}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-4 md:scroll-px-10 md:px-10 xl:px-[max(2.5rem,calc((100vw_-_80rem)/2_+_2.5rem))] xl:scroll-px-[max(2.5rem,calc((100vw_-_80rem)/2_+_2.5rem))]"
      >
        {practices.map((p, i) => (
          <li key={p.slug} className="reveal w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]" style={{ transitionDelay: `${i * 80}ms` }}>
            <article id={p.slug} className="group flex h-full min-h-80 flex-col justify-between bg-background p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-navy hover:text-navy-foreground hover:shadow-xl">
              <span className="text-sm tabular-nums text-muted-foreground transition-colors group-hover:text-highlight">0{i + 1}</span>
              <div>
                <h3 className="text-2xl font-light leading-tight">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-navy-foreground/80">{p.summary}</p>
                <span className="mt-6 inline-block h-px w-10 bg-current transition-all duration-500 group-hover:w-20" aria-hidden />
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
