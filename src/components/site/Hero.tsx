import { useEffect, useState } from "react";
import { practices } from "@/lib/site-data";
import hero from "@/assets/hero-sao-paulo.jpg";

export function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((v) => (v + 1) % practices.length), 6000);
    return () => clearTimeout(t);
  }, [i, paused]);
  const p = practices[i]!;

  return (
    <section id="inicio" aria-label="Destaques" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy-deep text-navy-foreground">
      <img src={hero} alt="" width={1920} height={1088} fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full scale-105 object-cover" />
      <div className="hero-overlay absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-32 md:px-10 md:pb-24">
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-highlight">Advocacia empresarial · São Paulo</p>
        <h1 className="sr-only">Vilarinho Advogados — escritório de advocacia empresarial em São Paulo</h1>
        <div key={i} className="animate-fade-up" aria-live="polite">
          <p className="max-w-3xl text-4xl font-light leading-[1.08] sm:text-5xl md:text-7xl">{p.title}</p>
          <p className="mt-6 max-w-xl text-base font-light text-navy-foreground/80 md:text-lg">{p.summary}</p>
        </div>
        <a href="#atuacao" className="mt-8 inline-flex items-center gap-3 border border-navy-foreground/60 px-6 py-3 text-sm font-medium transition-colors hover:bg-navy-foreground hover:text-navy-deep">
          Saiba mais <span aria-hidden>→</span>
        </a>

        <div className="mt-14 flex items-center gap-3" role="tablist" aria-label="Escolher destaque" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {practices.map((pr, idx) => (
            <button
              key={pr.slug}
              role="tab"
              aria-selected={idx === i}
              aria-label={pr.title}
              onClick={() => setI(idx)}
              className="group flex h-11 w-12 items-center sm:w-20"
            >
              <span className="relative block h-[2px] w-full overflow-hidden bg-navy-foreground/30">
                {idx === i && <span key={`${i}-${paused}`} className={paused ? "absolute inset-0 bg-highlight" : "animate-progress absolute inset-0 bg-highlight"} />}
                {idx < i && <span className="absolute inset-0 bg-navy-foreground/70" />}
              </span>
            </button>
          ))}
          <span className="ml-3 text-xs tabular-nums text-navy-foreground/70">0{i + 1} / 0{practices.length}</span>
        </div>
      </div>
    </section>
  );
}
