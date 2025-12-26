import { useEffect, useRef } from "react";
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";

export default function MarkdownEditor({ value, onChange }) {
  const textareaRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) return;

    editorRef.current = new EasyMDE({
      element: textareaRef.current,
      spellChecker: false,
      autofocus: true,
      status: false, 
      minHeight: "350px",
      maxHeight: "350px",
      placeholder: `Start writing your blog...

### Section Heading 
- Bullet point
**Bold text**
---
`,

      // ❌ REMOVE DEFAULT HEADING DROPDOWN
      toolbar: [
        "bold",
        "|",
        "italic",
        "|",
        {
          name: "h3",
          action: (editor) => {
            const cm = editor.codemirror;
            cm.replaceSelection("\n### ");
            cm.focus();
          },
          className: "fa fa-header",
          title: "Heading (###)",
        },
        "|",
        {
          name: "ul",
          action: EasyMDE.toggleUnorderedList,
          className: "fa fa-list-ul",
          title: "Bullet List",
        },
        {
          name: "hr",
          action: (editor) => {
            const cm = editor.codemirror;
            cm.replaceSelection("\n---\n");
            cm.focus();
          },
          className: "fa fa-minus",
          title: "Horizontal Rule",
        },
      ],
    });

    // Sync editor → parent state
    editorRef.current.codemirror.on("change", () => {
      onChange(editorRef.current.value());
    });
  }, [onChange]);

  // Sync parent → editor (WITHOUT losing cursor)
  useEffect(() => {
    if (
      editorRef.current &&
      value !== editorRef.current.value()
    ) {
      const cm = editorRef.current.codemirror;
      const cursor = cm.getCursor();
      editorRef.current.value(value);
      cm.setCursor(cursor);
    }
  }, [value]);

  return <textarea ref={textareaRef} />;
}
