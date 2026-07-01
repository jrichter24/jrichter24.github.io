import { useTranslations } from 'next-intl';
import Section from '@/components/Section';
import { JsonLd } from '@/components/JsonLd';
import { projectsLd } from '@/lib/structured-data';
import { siteConfig } from '@/site.config';

type LinkKind = 'github' | 'site' | 'fileExchange';
type ItemKey = 'toppt' | 'jonasBarney' | 'jonasBarneyPaint' | 'moldqueen';

// All projects are personal → red (section-based accent). Each card can carry a
// few links; aria-labels are composed so they contain the visible label (2.5.3).
const items: { key: ItemKey; links: { kind: LinkKind; href: string }[] }[] = [
  {
    key: 'toppt',
    links: [
      { kind: 'github', href: siteConfig.projects.toppt },
      { kind: 'fileExchange', href: siteConfig.projects.topptFileExchange },
    ],
  },
  {
    key: 'jonasBarney',
    links: [{ kind: 'site', href: siteConfig.projects.jonasBarney }],
  },
  {
    key: 'jonasBarneyPaint',
    links: [
      { kind: 'site', href: siteConfig.projects.jonasBarneyPaint },
      { kind: 'github', href: siteConfig.projects.jonasBarneyPaintSource },
    ],
  },
  {
    key: 'moldqueen',
    links: [
      { kind: 'site', href: siteConfig.projects.moldqueenSite },
      { kind: 'github', href: siteConfig.projects.moldqueen },
    ],
  },
];

export default function Projects() {
  const t = useTranslations('projects');
  const newTab = t('newTab');

  return (
    <Section id="projects" eyebrow={t('eyebrow')} title={t('title')} accent="red">
      <JsonLd data={projectsLd()} />
      <p className="mb-8 max-w-[68ch] text-lg text-ink/80">{t('intro')}</p>

      <ul className="divide-y divide-ink border-y border-ink">
        {items.map((it) => {
          const name = t(`items.${it.key}.name`);
          const meta = t.raw(`items.${it.key}.meta`) as string[];
          return (
            <li key={it.key} className="py-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="min-w-0">
                  <h3 className="flex flex-wrap items-center gap-3 text-xl font-bold">
                    <span aria-hidden className="inline-block h-4 w-1.5 bg-red" />
                    {name}
                  </h3>
                  <p className="mt-2 max-w-[60ch] text-ink/80">{t(`items.${it.key}.summary`)}</p>
                  {meta.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-ink/60">
                      {meta.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex shrink-0 flex-wrap gap-2 self-start">
                  {it.links.map((lnk) => {
                    const label = t(`linkLabels.${lnk.kind}`);
                    return (
                      <a
                        key={lnk.kind}
                        href={lnk.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} — ${name} (${newTab})`}
                        className="label-mono border-2 border-ink px-3 py-2 text-red hover:bg-red hover:text-paper"
                      >
                        {label} ↗
                      </a>
                    );
                  })}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
