import { Linkedin, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { team } from "@/lib/site-data";

const photos = import.meta.glob("../../assets/team/*.webp", { eager: true, import: "default" }) as Record<string, string>;
// Fictional profile information approved for this layout; do not use as real credentials.
const bios = [
  "Conduz a estratégia jurídica do escritório, com foco em contratos empresariais, governança e operações societárias. Valoriza relações próximas e soluções claras para decisões complexas.",
  "Apoia empresas em negociações estratégicas e reorganizações societárias. Combina uma visão abrangente dos negócios com atenção aos detalhes de cada operação.",
  "Dedica-se à elaboração e negociação de contratos comerciais, com foco na prevenção de riscos e na segurança das relações empresariais.",
  "Atua em planejamento patrimonial e sucessório, acompanhando famílias empresárias na organização de seu patrimônio e na continuidade de seus negócios.",
  "Assessora empresas em questões tributárias, unindo análise técnica e visão prática para estruturar soluções adequadas a cada negócio.",
  "Acompanha startups e empresas de tecnologia em investimentos, contratos e novos modelos de negócio, com atenção ao ambiente de inovação.",
  "Atua em operações societárias e governança corporativa, auxiliando empresas na organização de suas estruturas e na construção de acordos entre sócios.",
  "Dedica-se à consultoria empresarial e à revisão de contratos, com uma abordagem cuidadosa e orientada às necessidades de cada cliente.",
  "Assessora negócios inovadores em propriedade intelectual e relações comerciais, buscando conciliar proteção jurídica e desenvolvimento empresarial.",
];

export function TeamSection() {
  return (
    <section id="equipe" aria-labelledby="equipe-titulo" className="scroll-mt-16 bg-navy py-20 text-navy-foreground md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="reveal">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-navy-foreground/60">Pessoas</p>
          <h2 id="equipe-titulo" className="mt-3 text-4xl font-light md:text-5xl">Equipe<span className="text-highlight">.</span></h2>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-px bg-navy-foreground/10 sm:grid-cols-3">
          {team.map((person, i) => {
            const photo = photos[`../../assets/team/p${i}.webp`];
            const firstName = person.name.split(" ")[0]?.toLowerCase() ?? "equipe";
            const email = `${firstName}@example.com`;
            return (
              <li key={person.name} className="reveal bg-navy">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" aria-label={`Ver perfil de ${person.name}`} className="group h-full min-h-64 w-full flex-col gap-0 whitespace-normal rounded-none p-6 text-center text-navy-foreground hover:bg-navy-deep hover:text-navy-foreground md:p-8">
                      <span className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-navy-foreground/30 transition-colors group-hover:border-highlight md:h-28 md:w-28">
                        {photo && <img src={photo} alt={`Foto de ${person.name}`} width={256} height={256} loading="lazy" decoding="async" className="h-full w-full object-cover" />}
                      </span>
                      <span className="mt-6 text-lg font-normal leading-tight md:text-xl">{person.name}</span>
                      <span className="mt-1 text-sm font-normal text-navy-foreground/60">{person.role}</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90svh] w-[calc(100%-2rem)] max-w-3xl gap-0 overflow-y-auto rounded-sm border-0 bg-profile-surface p-0 text-profile-foreground sm:rounded-sm">
                    <div className="grid md:grid-cols-[0.9fr_1.1fr]">
                      <div className="relative min-h-52 overflow-hidden bg-profile-surface md:min-h-[460px]">
                        {photo && <img src={photo} alt={`Retrato de ${person.name}`} width={512} height={512} className="absolute inset-0 h-full w-full object-cover object-top opacity-80 grayscale" />}
                        <div className="profile-photo-wash absolute inset-0" />
                      </div>
                      <div className="relative px-7 pb-9 pt-7 md:flex md:flex-col md:justify-center md:px-10 md:py-16">
                        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-profile-muted">{person.role}</p>
                        <DialogTitle className="text-3xl font-light leading-tight tracking-normal md:text-4xl">{person.name}</DialogTitle>
                        <div className="my-6 h-px w-12 bg-profile-muted/40" />
                        <DialogDescription className="text-base font-light leading-relaxed text-profile-muted">{bios[i]}</DialogDescription>
                        <div className="mt-8 flex gap-3" aria-label={`Contatos de ${person.name}`}>
                          <Dialog>
                            <DialogTrigger asChild><Button variant="ghost" size="icon" aria-label={`LinkedIn de ${person.name}`} title="LinkedIn" className="h-11 w-11 rounded-full hover:bg-profile-muted/10"><Linkedin strokeWidth={1.4} /></Button></DialogTrigger>
                            <DialogContent><DialogTitle>LinkedIn</DialogTitle><DialogDescription>Perfil fictício de {person.name}. O link profissional será disponibilizado após confirmação.</DialogDescription></DialogContent>
                          </Dialog>
                          <Button asChild variant="ghost" size="icon" title={`E-mail fictício: ${email}`} className="h-11 w-11 rounded-full hover:bg-profile-muted/10"><a href={`mailto:${email}`} aria-label={`E-mail de ${person.name}`}><Mail strokeWidth={1.4} /></a></Button>
                          <Dialog>
                            <DialogTrigger asChild><Button variant="ghost" size="icon" aria-label={`WhatsApp de ${person.name}`} title="WhatsApp" className="h-11 w-11 rounded-full hover:bg-profile-muted/10"><MessageCircle strokeWidth={1.4} /></Button></DialogTrigger>
                            <DialogContent><DialogTitle>WhatsApp</DialogTitle><DialogDescription>Contato fictício: +55 (11) 00000-0000. O número de {person.name} será disponibilizado após confirmação.</DialogDescription></DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}