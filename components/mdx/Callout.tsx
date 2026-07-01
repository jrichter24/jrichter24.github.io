import type { ReactNode } from 'react';

// Design-law-abiding callout: hard left keyline, no rounded corners, no blur.
export function Callout({
  children,
  type = 'note',
}: {
  children: ReactNode;
  type?: 'note' | 'warn';
}) {
  const accent = type === 'warn' ? 'border-red' : 'border-blue';
  return (
    <aside className={`my-6 border-l-2 ${accent} bg-paper py-2 pl-4 pr-2`}>
      <div className="[&>p]:my-1">{children}</div>
    </aside>
  );
}
