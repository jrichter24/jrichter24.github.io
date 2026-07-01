import { useTranslations } from 'next-intl';
import Section from '@/components/Section';
import { siteConfig } from '@/site.config';

type Experience = { role: string; org: string; period: string };
type Education = { qualification: string; org: string; period: string };

export default function Cv() {
  const t = useTranslations('cv');
  const experience = t.raw('experience') as Experience[];
  const education = t.raw('education') as Education[];
  const curl = `curl ${siteConfig.url}/cv.txt`;

  // Compact padding/type on mobile so the table fits 360px with no internal scroll.
  const th =
    'border border-ink bg-ink px-2 py-2 text-left font-mono text-[0.68rem] uppercase tracking-wide text-paper sm:px-3 sm:text-xs';
  const td = 'border border-ink px-2 py-2 align-top text-sm sm:px-3';
  const tdMono = `${td} whitespace-nowrap font-mono text-xs sm:text-sm`;

  // Proper-noun expansions (same in both locales) for the abbreviated org column.
  const orgFull: Record<string, string> = {
    DNA: 'DNA Evolutions GmbH',
    RWTH: 'RWTH Aachen University',
  };
  const Org = ({ short }: { short: string }) => (
    <abbr title={orgFull[short] ?? short} className="no-underline">
      {short}
    </abbr>
  );

  return (
    <Section id="cv" eyebrow={t('eyebrow')} title={t('title')}>
      <p className="mb-8 max-w-[68ch] text-lg text-ink/80">{t('lead')}</p>

      {/* Experience */}
      <h3 className="label-mono mb-3">{t('experienceTitle')}</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-ink">
          <thead>
            <tr>
              <th scope="col" className={th}>
                {t('colRole')}
              </th>
              <th scope="col" className={th}>
                {t('colOrg')}
              </th>
              <th scope="col" className={th}>
                {t('colPeriod')}
              </th>
            </tr>
          </thead>
          <tbody>
            {experience.map((row) => (
              <tr key={`${row.role}-${row.period}`}>
                <th scope="row" className={`${td} font-bold`}>
                  {row.role}
                </th>
                <td className={td}>
                  <Org short={row.org} />
                </td>
                <td className={tdMono}>{row.period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Education */}
      <h3 className="label-mono mb-3 mt-10">{t('educationTitle')}</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-ink">
          <thead>
            <tr>
              <th scope="col" className={th}>
                {t('colQualification')}
              </th>
              <th scope="col" className={th}>
                {t('colOrg')}
              </th>
              <th scope="col" className={th}>
                {t('colPeriod')}
              </th>
            </tr>
          </thead>
          <tbody>
            {education.map((row) => (
              <tr key={`${row.qualification}-${row.period}`}>
                <th scope="row" className={`${td} font-bold`}>
                  {row.qualification}
                </th>
                <td className={td}>
                  <Org short={row.org} />
                </td>
                <td className={tdMono}>{row.period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="label-mono mt-3 text-ink/60">{t('legend')}</p>

      {/* curl-able text version (an easter egg, not a download) */}
      <div className="mt-10 max-w-[68ch]">
        <p className="label-mono mb-2 text-ink/60">{t('curlIntro')}</p>
        <div className="hard-box bg-paper p-4 font-mono text-sm">
          <code className="break-all">
            <span className="text-ink/60">$ </span>
            {curl}
          </code>
        </div>
        <p className="label-mono mt-2 text-ink/60">{t('curlNote')}</p>
      </div>
    </Section>
  );
}
