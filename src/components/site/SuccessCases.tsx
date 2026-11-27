import { useState } from "react";
import ma from "@/assets/cases/case-ma.webp";
import startup from "@/assets/cases/case-startup.webp";
import familia from "@/assets/cases/case-familia.webp";

const cases = [
  { title: "Aquisição de grupo industrial", text: "Assessoria completa na aquisição de um grupo industrial nacional, da due diligence ao fechamento da operação.", img: ma, credit: "Societário e M&A" },
  { title: "Rodada Série A de fintech", text: "Estruturação jurídica da rodada de investimento Série A de uma fintech paulista, com investidores nacionais e estrangeiros.", img: startup, credit: "Startups e Inovação" },
  { title: "Sucessão de empresa familiar", text: "Planejamento sucessório de uma empresa familiar com três gerações, com holding patrimonial e acordo de sócios.", img: familia, credit: "Planejamento Sucessório" },
];

export function SuccessCases() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((v) => (v + d + cases.length) % cases.length);
  const c = cases[i]!;
  return (
    <section id="cases" aria-labelledby="cases-titulo" className="relative scroll-mt-16 overflow-hidden bg-navy-deep text-navy-foreground">
      {cases.map((k, n) => (
        <img key={k.title} src={k.img} alt="" aria-hidden loading="lazy" decoding="async" width={1672} height={940}
          className={`absolute inset-0 h-full w-full object-cover grayscale transition-opacity duration-1000 ${n === i ? "opacity-100" : "opacity-0"}`} />
      ))}
      <div aria-hidden className="absolute inset-0 bg-navy-deep/40" />
      <div className="relative flex min-h-[640px] md:min-h-[700px]">
        <div className="hidden w-24 shrink-0 items-start justify-center border-r border-navy-foreground/60 bg-navy-deep/40 pt-12 md:flex lg:w-36">
          <h2 id="cases-titulo" className="text-4xl font-light tracking-wide [writing-mode:vertical-rl] rotate-180 lg:text-5xl">Cases de Sucesso</h2>
        </div>
        <div className="flex flex-1 flex-col">
          <h2 className="px-5 pt-10 text-3xl font-light md:hidden" aria-hidden>Cases de Sucesso</h2>
          <ul className="flex flex-col gap-8 px-5 pt-10 md:ml-auto md:w-1/2 md:px-10 md:pt-20">
            {cases.map((k, n) => (
              <li key={k.title}>
                <button onClick={() => setI(n)} aria-current={n === i}
                  className={`text-left text-xl uppercase tracking-[0.15em] transition-opacity md:text-3xl ${n === i ? "opacity-100" : "opacity-60 hover:opacity-100"}`}>
                  {k.title}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-auto hidden px-10 pb-8 text-xs md:block">{c.credit}</p>
          <div className="mt-10 bg-secondary/90 px-5 py-8 text-foreground backdrop-blur md:absolute md:bottom-0 md:right-0 md:mt-0 md:w-1/2 md:px-10 md:py-12" aria-live="polite">
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <h3 className="text-xl uppercase tracking-[0.15em] text-primary md:text-2xl">{c.title}</h3>
                <p className="mt-4 max-w-xl leading-relaxed">{c.text}</p>
              </div>
              <div className="flex gap-2 pt-12">
                <button onClick={() => go(1)} aria-label="Próximo case" className="p-1 transition-transform hover:translate-y-0.5">
                  <svg width="28" height="16" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 1l13 13L27 1" /></svg>
                </button>
                <button onClick={() => go(-1)} aria-label="Case anterior" className="p-1 transition-transform hover:-translate-y-0.5">
                  <svg width="28" height="16" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 15L14 2l13 13" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
