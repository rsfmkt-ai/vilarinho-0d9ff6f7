import { createFileRoute } from "@tanstack/react-router";
import { Header, Logo } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { PracticeCarousel } from "@/components/site/PracticeCarousel";
import { useReveal } from "@/components/site/use-reveal";
import { contact, nav, posts, practices, team } from "@/lib/site-data";
import hero from "@/assets/slide-contratos.jpg";

const TITLE = "Vilarinho Advogados | Advocacia Empresarial em São Paulo";
const DESC =
  "Escritório de advocacia empresarial na Faria Lima: contratos comerciais, societário e M&A, tributário, planejamento sucessório e startups.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Vilarinho Advogados",
  description: DESC,
  telephone: contact.phone,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.street,
    addressLocality: contact.city,
    addressRegion: contact.region,
    addressCountry: contact.country,
  },
  areaServed: "BR",
  knowsAbout: practices.map((p) => p.title),
  employee: team.map((t) => ({ "@type": "Person", name: t.name, jobTitle: t.role })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Áreas de atuação",
    itemListElement: practices.map((p) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: p.title, description: p.summary },
    })),
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: hero, fetchPriority: "high" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

function initials(name: string) {
  const p = name.split(" ");
  return (p[0]![0]! + p[p.length - 1]![0]!).toUpperCase();
}

function SectionTitle({ id, eyebrow, title, dark }: { id: string; eyebrow: string; title: string; dark?: boolean }) {
  return (
    <div className="reveal">
      <p className={`text-xs font-medium uppercase tracking-[0.3em] ${dark ? "text-navy-foreground/60" : "text-muted-foreground"}`}>{eyebrow}</p>
      <h2 id={id} className="mt-3 text-4xl font-light md:text-5xl">
        {title}<span className="text-highlight">.</span>
      </h2>
    </div>
  );
}

function Index() {
  useReveal();
  return (
    <>
      <Header />
      <main id="conteudo-principal">
        <Hero />

        <section id="escritorio" aria-labelledby="escritorio-titulo" className="scroll-mt-16 py-20 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-12 md:px-10">
            <div className="md:col-span-4">
              <SectionTitle id="escritorio-titulo" eyebrow="Quem somos" title="Escritório" />
            </div>
            <div className="md:col-span-8">
              <p className="reveal text-2xl font-light leading-snug md:text-4xl">
                Somos um escritório com atuação orientada para os negócios dos nossos clientes.
              </p>
              <p className="reveal mt-8 max-w-2xl leading-relaxed text-muted-foreground">
                Por isso, desenvolvemos soluções individualizadas, baseadas nas expectativas e nas necessidades de cada um,
                aplicando criatividade, inovação e, ao mesmo tempo, pragmatismo.
              </p>
            </div>
          </div>
        </section>

        <PracticeCarousel />

        <section id="equipe" aria-labelledby="equipe-titulo" className="scroll-mt-16 bg-navy py-20 text-navy-foreground md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <SectionTitle id="equipe-titulo" eyebrow="Pessoas" title="Equipe" dark />
            <ul className="mt-12 grid grid-cols-2 gap-px bg-navy-foreground/10 sm:grid-cols-3 lg:grid-cols-3">
              {team.map((t, i) => (
                <li key={t.name} className="reveal group bg-navy p-6 transition-colors duration-500 hover:bg-navy-deep md:p-8" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                  <div aria-hidden className="grid h-14 w-14 place-items-center rounded-full border border-navy-foreground/30 text-sm tracking-widest transition-colors group-hover:border-highlight group-hover:text-highlight">
                    {initials(t.name)}
                  </div>
                  <h3 className="mt-6 text-lg font-normal leading-tight md:text-xl">{t.name}</h3>
                  <p className="mt-1 text-sm text-navy-foreground/60">{t.role}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="conteudo" aria-labelledby="conteudo-titulo" className="scroll-mt-16 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <SectionTitle id="conteudo-titulo" eyebrow="Publicações" title="Conteúdos" />
            <ul className="mt-12 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
              {posts.map((p, i) => (
                <li key={p.title} className="reveal bg-background" style={{ transitionDelay: `${i * 80}ms` }}>
                  <article className="group flex h-full flex-col gap-6 p-6 transition-colors hover:bg-secondary md:p-8">
                    <p className="text-xs text-muted-foreground">
                      <time dateTime={p.date}>{p.label}</time> <span aria-hidden>|</span> <span className="text-primary">{p.tag}</span>
                    </p>
                    <h3 className="text-lg font-normal leading-snug">{p.title}</h3>
                    <span aria-hidden className="mt-auto text-primary transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contato" aria-labelledby="contato-titulo" className="scroll-mt-16 bg-secondary py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:px-10">
            <div className="md:col-span-5">
              <SectionTitle id="contato-titulo" eyebrow="Contato" title="Vamos conversar" />
            </div>
            <address className="reveal grid gap-10 not-italic sm:grid-cols-3 md:col-span-7">
              <div>
                <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">São Paulo</h3>
                <p className="mt-3 leading-relaxed">Vilarinho Advogados<br />{contact.street}<br />{contact.district}</p>
                <a href={contact.waze} target="_blank" rel="noopener noreferrer" className="link-underline mt-3 inline-block text-sm text-primary">Abrir no Waze</a>
              </div>
              <div>
                <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">Telefone</h3>
                <a href={contact.phoneHref} className="link-underline mt-3 inline-block">{contact.phone}</a>
              </div>
              <div>
                <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">E-mail</h3>
                <a href={`mailto:${contact.email}`} className="link-underline mt-3 inline-block break-all">{contact.email}</a>
              </div>
            </address>
          </div>
        </section>
      </main>

      <footer className="bg-navy-deep text-navy-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-10">
          <Logo />
          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-navy-foreground/80">
              {nav.map((n) => (
                <li key={n.id}><a href={`#${n.id}`} className="link-underline">{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="flex gap-5 text-sm text-navy-foreground/80">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="link-underline">Instagram</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="link-underline">LinkedIn</a>
          </div>
        </div>
        <div className="border-t border-navy-foreground/10">
          <div className="mx-auto flex max-w-7xl justify-between px-5 py-5 text-xs text-navy-foreground/60 md:px-10">
            <span>© {new Date().getFullYear()} Vilarinho Advogados</span>
            <span>Política de privacidade</span>
          </div>
        </div>
      </footer>
    </>
  );
}
