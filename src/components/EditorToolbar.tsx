import { Editor } from "@tiptap/react";

type Props = {
  editor: Editor | null;
};

const EditorToolbar = ({ editor }: Props) => {
  if (!editor) return null;

  return (
    <div className="mb-4 flex gap-2 border border-gray-200 rounded-md p-2 bg-white">
      {/* Bold */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1 text-sm rounded ${
          editor.isActive("bold")
            ? "bg-black text-white"
            : "bg-gray-100"
        }`}
      >
        B
      </button>

      {/* Italic */}
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1 text-sm rounded ${
          editor.isActive("italic")
            ? "bg-black text-white"
            : "bg-gray-100"
        }`}
      >
        I
      </button>

      {/* Heading */}
      <button
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={`px-3 py-1 text-sm rounded ${
          editor.isActive("heading", { level: 2 })
            ? "bg-black text-white"
            : "bg-gray-100"
        }`}
      >
        H2
      </button>

      {/* Bullet List */}
      <button
        onClick={() =>
          editor.chain().focus().toggleBulletList().run()
        }
        className={`px-3 py-1 text-sm rounded ${
          editor.isActive("bulletList")
            ? "bg-black text-white"
            : "bg-gray-100"
        }`}
      >
        • List
      </button>
    </div>
  );
};

export default EditorToolbar;
