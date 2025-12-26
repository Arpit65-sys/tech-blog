export default function PostContent({ title, content }) {
  return (
    <div className="flex-1">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{title}</h1>
      <hr className="border-gray-300 mb-6" />

      <p
        className="text-gray-800 text-lg leading-relaxed whitespace-pre-line overflow-y-auto
        [scrollbar-width:none] scrollbar-none max-h-[55vh]"
        onDoubleClick={() => document.getElementById("like-trigger")?.click()}
      >
        {content}
      </p>
    </div>
  );
}
