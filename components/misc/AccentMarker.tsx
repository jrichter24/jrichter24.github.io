import { useTranslations } from 'next-intl';
import type { PostAccent } from '@/lib/posts';

// Small square marker for a Misc post, reusing the accent semantics: blue = work,
// red = personal, hollow ink border = uncategorized (none). The colour carries
// meaning, so the marker exposes a localized accessible name (role="img" +
// aria-label + title), not colour-alone. Square, flat fill, no blur.
// Size + spacing come from the caller via `className`.
export default function AccentMarker({
  accent,
  className = '',
}: {
  accent: PostAccent;
  className?: string;
}) {
  const t = useTranslations('misc');
  const label = t(`accents.${accent}`);
  const fill =
    accent === 'work' ? 'bg-blue' : accent === 'personal' ? 'bg-red' : 'border border-ink';

  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      className={`inline-block shrink-0 ${fill} ${className}`}
    />
  );
}
