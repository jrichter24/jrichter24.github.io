// Figure for posts. Images live in the post folder (content/misc/<slug>/) and
// are synced to public/misc/<slug>/ by `scripts/sync-post-images.mjs` (prebuild).
// Reference `src` by that post path, e.g. /misc/<slug>/diagram.webp — a
// locale-agnostic absolute path that resolves the same from /en/... and /de/....
export function Figure({
  src,
  alt = '',
  caption,
}: {
  src: string;
  alt?: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full border-2 border-ink" />
      {caption && <figcaption className="label-mono mt-2 text-ink/60">{caption}</figcaption>}
    </figure>
  );
}
