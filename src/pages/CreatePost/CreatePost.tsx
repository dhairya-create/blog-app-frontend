import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createPost } from "../../api/posts.api";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const coverPreview = useMemo(() => {
    if (!coverFile) return null;
    return URL.createObjectURL(coverFile);
  }, [coverFile]);

  const isPublishDisabled =
    loading || title.trim().length === 0 || content.trim().length === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("content", content);
      if (coverFile) data.append("cover", coverFile);

      await createPost(data);
      toast.success("Post published");
      navigate("/posts");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to publish post"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-dvh bg-white">
      {/* ---------- TOP BAR ---------- */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-8 py-3 flex justify-end">
          <button
            type="submit"
            disabled={isPublishDisabled}
            className={`rounded-full px-6 py-2 text-sm font-medium transition
              ${
                isPublishDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900"
              }`}
          >
            {loading ? "Publishing…" : "Publish"}
          </button>
        </div>
      </div>

      {/* ---------- DOCUMENT ---------- */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-6 pb-24 space-y-6">
        {/* ---------- TITLE ---------- */}
        <input
          type="text"
          placeholder="Write a clear, compelling title"
          value={title}
          disabled={loading}
          onChange={(e) => setTitle(e.target.value)}
          className="
            w-full
            text-xl
            sm:text-2xl
            md:text-3xl
            font-semibold
            leading-snug
            placeholder:text-gray-400
            text-gray-900
            focus:outline-none
            disabled:opacity-50
          "
        />

        {/* ---------- COVER ---------- */}
        <div className="space-y-2">
          <span className="text-xs sm:text-sm font-medium text-gray-600">
            Cover image
          </span>

          <div className="flex items-center gap-3 flex-wrap">
            <label
              htmlFor="cover-upload"
              className={`rounded-full border px-4 py-1.5 text-xs sm:text-sm font-medium
                ${
                  loading
                    ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 bg-white text-gray-700 cursor-pointer hover:bg-gray-100"
                }`}
            >
              Upload
            </label>

            {coverPreview && (
              <img
                src={coverPreview}
                alt="Cover preview"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded object-cover border border-gray-200"
              />
            )}

            <span className="max-w-45 truncate text-xs sm:text-sm text-gray-500">
              {coverFile ? coverFile.name : "No file selected"}
            </span>
          </div>

          <input
            id="cover-upload"
            type="file"
            accept="image/*"
            disabled={loading}
            className="hidden"
            onChange={(e) =>
              setCoverFile(e.target.files?.[0] || null)
            }
          />
        </div>

        {/* ---------- BODY ---------- */}
        <div className="space-y-2">
          <textarea
  placeholder="Start writing your article…"
  value={content}
  disabled={loading}
  onChange={(e) => setContent(e.target.value)}
  rows={10}
  className="
    w-full
    resize-none
    bg-transparent
    border
    border-transparent
    rounded-md
    p-3
    text-sm
    sm:text-base
    md:text-lg
    leading-7
    md:leading-8
    text-gray-800
    transition
    focus:outline-none
    focus:border-gray-300
    focus:bg-white
    disabled:opacity-50
  "
/>


          <div className="text-right text-xs sm:text-sm text-gray-400">
            {content.length} characters
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
