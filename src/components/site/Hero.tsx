import { useEffect, useState } from "react";
import { practices } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import imgContratos from "@/assets/slide-contratos.jpg";
import imgSocietario from "@/assets/slide-societario.jpg";
import imgTributario from "@/assets/slide-tributario.jpg";
import imgSucessorio from "@/assets/slide-sucessorio.jpg";
import imgStartups from "@/assets/slide-startups.jpg";

export const heroImages = [imgContratos, imgSocietario, imgTributario, imgSucessorio, imgStartups];

/** Even slides: white background + dark text. Odd slides: light grey + light text. */
export const slideTone = (i: number): "dark" | "light" => (i % 2 === 0 ? "dark" : "light");

export function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((v) => (v + 1) % practices.length), 6000);
    return () => clearTimeout(t);
  }, [i, paused]);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("hero-tone", { detail: slideTone(i) }));
  }, [i]);
  const p = practices[i] ?? practices[0];
  const light = slideTone(i) === "light";

  return (
    <section
      id="inicio"
      aria-label="Destaques"
      className={cn(
        "relative isolate flex min-h-[100svh] items-end overflow-hidden transition-colors duration-700",
        light ? "bg-secondary text-navy-foreground" : "bg-background text-foreground",
      )}
    >
      {heroImages.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt=""
          width={1920}
          height={1088}
          fetchPriority={idx === 0 ? "high" : "low"}
          loading={idx === 0 ? "eager" : "lazy"}
          className={cn("absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-1000", idx === i ? "opacity-100" : "opacity-0")}
        />
      ))}
      <div className={cn("absolute inset-0 -z-10 transition-opacity duration-700", light ? "hero-wash-charcoal" : "hero-wash-light")} />
      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-32 md:px-10 md:pb-24">
        <p className={cn("mb-5 text-xs font-medium uppercase tracking-[0.3em]", light ? "text-navy-foreground/80" : "text-highlight")}>Advocacia empresarial · São Paulo</p>
        <h1 className="sr-only">Vilarinho Advogados — escritório de advocacia empresarial em São Paulo</h1>
        <div key={i} className="animate-fade-up" aria-live="polite">
          <p className="max-w-3xl text-4xl font-light leading-[1.08] sm:text-5xl md:text-7xl">{p.title}</p>
          <p className={cn("mt-6 max-w-xl text-base font-light md:text-lg", light ? "text-navy-foreground/85" : "text-muted-foreground")}>{p.summary}</p>
        </div>
        <a
          href="#atuacao"
          className={cn(
            "mt-8 inline-flex items-center gap-3 border px-6 py-3 text-sm font-medium transition-colors",
            light ? "border-navy-foreground/60 hover:bg-navy-foreground hover:text-navy" : "border-primary/60 hover:bg-primary hover:text-primary-foreground",
          )}
        >
          Saiba mais <span aria-hidden>→</span>
        </a>

        <div className="mt-14 flex items-center gap-3" role="tablist" aria-label="Escolher destaque" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {practices.map((pr, idx) => (
            <button key={pr.slug} role="tab" aria-selected={idx === i} aria-label={pr.title} onClick={() => setI(idx)} className="group flex h-11 w-12 items-center sm:w-20">
              <span className="relative block h-[2px] w-full overflow-hidden bg-current/25">
                {idx === i && <span key={`${i}-${paused}`} className={paused ? "absolute inset-0 bg-highlight" : "animate-progress absolute inset-0 bg-highlight"} />}
                {idx < i && <span className="absolute inset-0 bg-current/70" />}
              </span>
            </button>
          ))}
          <span className="ml-3 text-xs tabular-nums opacity-70">0{i + 1} / 0{practices.length}</span>
        </div>
      </div>
    </section>
  );
}
