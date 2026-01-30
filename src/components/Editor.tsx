import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "./EditorToolbar";

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start writing here…</p>",
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] text-lg leading-8 text-gray-800 focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  return (
    <div>
      <EditorToolbar editor={editor} />

      <div className="border border-gray-200 rounded-md p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
