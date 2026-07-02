import type { ReactNode } from 'react';

// Shared two-column layout for Now/Work and Research: prose on the left, a
// mono-labelled chip list ("Topics") on the right. Below lg it collapses to one
// column (prose, then chips). Kept as a single component so both sections stay
// pixel-identical instead of drifting near-copies. Layout only — colours,
// spacing and the chip styling are unchanged from the original inline markup.
export default function TopicsColumns({
  label,
  topics,
  children,
}: {
  label: string;
  topics: string[];
  children: ReactNode;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
      {children}
      <div>
        <p className="label-mono mb-3 text-ink/60">{label}</p>
        <ul className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <li
              key={topic}
              className="border border-ink px-2.5 py-1 font-mono text-xs uppercase tracking-wide"
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
