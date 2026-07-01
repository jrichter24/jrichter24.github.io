// Figure for posts. NOTE: in a static export, use an absolute public path for
// `src` (e.g. /misc/<slug>/diagram.png). A relative-to-post-folder image
// pipeline can be added when real posts (with images) arrive.
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
