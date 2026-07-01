import type { ReactNode } from 'react';

// Consistent section shell: mono eyebrow, accent keyline, uppercase H2, content.
// accent: blue = work/research, red = projects, default ink.
export default function Section({
  id,
  eyebrow,
  title,
  accent,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  accent?: 'blue' | 'red';
  children: ReactNode;
}) {
  const bar = accent === 'blue' ? 'bg-blue' : accent === 'red' ? 'bg-red' : 'bg-ink';

  return (
    <section id={id} className="scroll-mt-8 border-b border-ink">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="label-mono mb-3 text-ink/60">{eyebrow}</p>
        <div className="flex items-center gap-4">
          <span aria-hidden className={`inline-block h-9 w-1.5 ${bar}`} />
          <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl">{title}</h2>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
