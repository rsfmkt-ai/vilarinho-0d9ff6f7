import { useEffect, useRef, useState } from "react";
import { nav, practices } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3 leading-none", className)}>
      <span aria-hidden className="font-serif text-3xl font-medium tracking-tight md:text-4xl">VL</span>
      <span aria-hidden className="h-8 w-px bg-current opacity-40" />
      <span className="flex flex-col">
        <span className="text-lg font-extralight tracking-[0.22em] md:text-xl">VILARINHO</span>
        <span className="mt-1 self-end text-[0.55rem] font-light tracking-[0.35em] opacity-80">ADVOGADOS</span>
      </span>
    </span>
  );
}

const searchItems = [
  ...nav.map((n) => ({ id: n.id, label: n.label, hint: "Seção" })),
  ...practices.map((p) => ({ id: p.slug, label: p.title, hint: "Atuação" })),
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");
  const [tone, setTone] = useState<"dark" | "light">("dark");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onTone = (e: Event) => setTone((e as CustomEvent<"dark" | "light">).detail);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hero-tone", onTone);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hero-tone", onTone);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open || search ? "hidden" : "";
    if (search) inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); setSearch(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, search]);

  const solid = scrolled && !open && !search;
  const overlay = open || search;
  const results = searchItems.filter((s) => s.label.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <>
      <a href="#conteudo-principal" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-background focus:px-4 focus:py-2 focus:text-foreground">
        Pular para o conteúdo
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          solid ? "bg-background/95 text-foreground shadow-sm backdrop-blur" : overlay || tone === "light" ? "bg-transparent text-navy-foreground" : "bg-transparent text-foreground",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-10">
          <a href="#inicio" aria-label="Vilarinho Advogados — início"><Logo /></a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex gap-9 text-sm font-medium">
              {nav.map((n) => (
                <li key={n.id}><a href={`#${n.id}`} className="link-underline pb-1">{n.label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden text-xs font-medium sm:block" aria-label="Idioma">
              <span aria-current="true" className="text-highlight">PT</span>
              <span className="mx-2 opacity-50">|</span>
              <span className="opacity-70">EN</span>
            </div>
            <button type="button" onClick={() => { setOpen(false); setSearch((v) => !v); }} aria-expanded={search} aria-controls="search-overlay" aria-label={search ? "Fechar busca" : "Buscar"} className="grid h-11 w-11 place-items-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden>
                <circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" />
              </svg>
            </button>
            <button type="button" onClick={() => { setSearch(false); setOpen((v) => !v); }} aria-expanded={open} aria-controls="menu-overlay" aria-label={open ? "Fechar menu" : "Abrir menu"} className="grid h-11 w-11 place-items-center lg:hidden">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden>
                <circle cx="20" cy="20" r="18.5" />
                {open ? (
                  <><path d="m15 15 10 10" /><path d="m25 15-10 10" /></>
                ) : (
                  <><path d="M14 16h12" /><path d="M18 20h8" /><path d="M14 24h12" /></>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div id="menu-overlay" className={cn("fixed inset-0 z-40 bg-navy-deep text-navy-foreground transition-[clip-path] duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] lg:hidden", open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]")} aria-hidden={!open}>
        <nav aria-label="Menu móvel" className="flex h-full flex-col justify-center px-8">
          <ul className="space-y-5">
            {nav.map((n, i) => (
              <li key={n.id} className={cn("transition-all duration-500", open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0")} style={{ transitionDelay: open ? `${200 + i * 70}ms` : "0ms" }}>
                <a href={`#${n.id}`} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className="text-4xl font-light">{n.label}<span className="text-highlight">.</span></a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div id="search-overlay" role="dialog" aria-label="Buscar no site" aria-hidden={!search} className={cn("fixed inset-0 z-40 bg-navy-deep text-navy-foreground transition-[clip-path] duration-700 ease-[cubic-bezier(0.7,0,0.2,1)]", search ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]")}>
        <div className="mx-auto flex h-full max-w-3xl flex-col px-8 pt-32">
          <label htmlFor="site-search" className="text-xs uppercase tracking-[0.3em] text-navy-foreground/60">Buscar</label>
          <input ref={inputRef} id="site-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} tabIndex={search ? 0 : -1} placeholder="Áreas, equipe, contato…" className="mt-3 w-full border-b border-navy-foreground/40 bg-transparent pb-3 text-3xl font-light outline-none placeholder:text-navy-foreground/40 focus:border-highlight md:text-4xl" />
          <ul className="mt-8 space-y-4 overflow-y-auto">
            {results.map((r) => (
              <li key={r.id}>
                <a href={`#${r.id}`} tabIndex={search ? 0 : -1} onClick={() => { setSearch(false); setQ(""); }} className="flex items-baseline justify-between gap-4 text-xl font-light hover:text-highlight">
                  {r.label}<span className="text-xs uppercase tracking-widest text-navy-foreground/50">{r.hint}</span>
                </a>
              </li>
            ))}
            {results.length === 0 && <li className="text-navy-foreground/60">Nenhum resultado.</li>}
          </ul>
        </div>
      </div>
    </>
  );
}
