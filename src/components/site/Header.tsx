import { useEffect, useState } from "react";
import { nav } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled && !open;

  return (
    <>
      <a href="#conteudo-principal" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-background focus:px-4 focus:py-2 focus:text-foreground">
        Pular para o conteúdo
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          solid ? "bg-background/95 text-foreground shadow-sm backdrop-blur" : "bg-transparent text-navy-foreground",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-10">
          <a href="#inicio" className="flex flex-col leading-none" aria-label="Vilarinho Advogados — início">
            <span className="text-xl font-semibold tracking-[0.12em] md:text-2xl">VILARINHO</span>
            <span className="mt-1 self-end text-[0.6rem] tracking-[0.35em] opacity-80">ADVOGADOS</span>
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex gap-9 text-sm font-medium">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="link-underline pb-1">{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden text-xs font-medium sm:block" aria-label="Idioma">
              <span aria-current="true" className="text-highlight">PT</span>
              <span className="mx-2 opacity-50">|</span>
              <span className="opacity-70">EN</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-overlay"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="relative grid h-11 w-11 place-items-center lg:hidden"
            >
              <span className={cn("absolute h-px w-7 bg-current transition-transform duration-300", open ? "rotate-45" : "-translate-y-1.5")} />
              <span className={cn("absolute h-px w-7 bg-current transition-transform duration-300", open ? "-rotate-45" : "translate-y-1.5")} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-overlay"
        className={cn(
          "fixed inset-0 z-40 bg-navy-deep text-navy-foreground transition-[clip-path] duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] lg:hidden",
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
        )}
        aria-hidden={!open}
      >
        <nav aria-label="Menu móvel" className="flex h-full flex-col justify-center px-8">
          <ul className="space-y-5">
            {nav.map((n, i) => (
              <li key={n.id} className={cn("transition-all duration-500", open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0")} style={{ transitionDelay: open ? `${200 + i * 70}ms` : "0ms" }}>
                <a href={`#${n.id}`} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className="text-4xl font-light">
                  {n.label}<span className="text-highlight">.</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
