// components/HighlightText.tsx
interface Props {
  text?: string | null;
  highlight?: string;
}

export default function HighlightText({
  text = "",
  highlight = "",
}: Props) {
  if (!text) return null;
  if (!highlight) return <span>{text}</span>;

  const regex = new RegExp(`(${escapeRegExp(highlight)})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <mark
            key={index}
            className="bg-yellow-300"
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
}


function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
