// Emits a JSON-LD block using Next.js's officially recommended pattern.
// The payload is our own structured data (never user input), so injecting it
// as raw JSON is safe.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
