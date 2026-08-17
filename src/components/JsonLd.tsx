// Renders a JSON-LD <script> block. Server component — the payload is
// serialized at render time and ships in the initial HTML so crawlers that
// do not execute JavaScript still see the structured data.
//
// "<" is escaped so a stray "</script>" inside any string field cannot break
// out of the script element.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
