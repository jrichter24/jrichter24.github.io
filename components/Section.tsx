import type { ReactNode } from 'react';

// Consistent section shell: mono eyebrow, accent keyline, uppercase H2, content.
// accent: blue = work/research, red = projects, default ink. `bars` overrides the
// single keyline with a small side-by-side set (Misc. passes red/blue/ink to
// signal it holds all three post kinds). The keyline is decorative (aria-hidden).
const barClass = (c: 'red' | 'blue' | 'ink') =>
  c === 'blue' ? 'bg-blue' : c === 'red' ? 'bg-red' : 'bg-ink';

export default function Section({
  id,
  eyebrow,
  title,
  accent,
  bars,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  accent?: 'blue' | 'red';
  bars?: Array<'red' | 'blue' | 'ink'>;
  children: ReactNode;
}) {
  const bar = accent === 'blue' ? 'bg-blue' : accent === 'red' ? 'bg-red' : 'bg-ink';

  return (
    <section id={id} className="scroll-mt-8 border-b border-ink">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="label-mono mb-3 text-ink/60">{eyebrow}</p>
        <div className="flex items-center gap-4">
          {bars ? (
            <span aria-hidden className="flex shrink-0 items-center gap-2">
              {bars.map((b) => (
                <span key={b} className={`inline-block h-9 w-1.5 ${barClass(b)}`} />
              ))}
            </span>
          ) : (
            <span aria-hidden className={`inline-block h-9 w-1.5 ${bar}`} />
          )}
          <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl">{title}</h2>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
