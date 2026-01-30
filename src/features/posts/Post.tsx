import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../../contexts/UserContext";
import {
  deletePost,
  getPostById,
  updatePost,
} from "../../api/posts.api";
import ConfirmDialog from "../../components/ConfirmDialog";
import PostPageSkeleton from "../../components/skeleton/PostPageSkeleton";

interface Post {
  _id: string;
  title: string;
  content: string;
  cover?: string;
  author?: {
    _id: string;
    fullName: string;
  };
  createdAt: string;
}

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading: userLoading } = useContext(UserContext);

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  /* ---------- FETCH POST ---------- */
  useEffect(() => {
    if (!id) return;

    getPostById(id)
      .then((res) => {
        setPost(res.data);
        setEditTitle(res.data.title);
        setEditContent(res.data.content);
      })
      .catch(() => {
        toast.error("Failed to load post");
      })
      .finally(() => setLoading(false));
  }, [id]);

  /* ---------- LOADING ---------- */
  if (loading || userLoading) {
    return <PostPageSkeleton />;
  }

  if (!post) {
    return (
      <p className="text-gray-500 text-center mt-10">
        Post not found.
      </p>
    );
  }

  const isAuthor =
    !!user &&
    !!post.author &&
    String(user.id) === String(post.author._id);

  /* ---------- DELETE ---------- */
  const handleDelete = async () => {
    if (deleting) return;

    setDeleting(true);

    try {
      await deletePost(id!);
      toast.success("Post deleted");
      navigate("/posts");
    } catch {
      toast.error("Failed to delete post");
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  /* ---------- UPDATE ---------- */
  const handleUpdate = async () => {
    if (updating) return;

    setUpdating(true);

    try {
      await updatePost(id!, {
        title: editTitle,
        content: editContent,
      });

      setPost((prev) =>
        prev
          ? { ...prev, title: editTitle, content: editContent }
          : prev
      );

      setIsEditing(false);
      toast.success("Post updated");
    } catch {
      toast.error("Failed to update post");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <article className="mx-auto max-w-4xl px-4 py-10">
        {/* ---------- TITLE ---------- */}
        {isEditing ? (
          <input
            value={editTitle}
            disabled={updating}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full border-b text-4xl font-bold focus:outline-none disabled:opacity-50"
          />
        ) : (
          <h1 className="text-4xl font-bold leading-tight wrap-break-word">
            {post.title}
          </h1>
        )}

        {/* ---------- META ---------- */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span>{post.author?.fullName || "Anonymous"}</span>
          <span>·</span>
          <span>
            {new Date(post.createdAt).toLocaleDateString()}
          </span>

          {isAuthor && !isEditing && (
            <>
              <span>·</span>
              <button
                onClick={() => setIsEditing(true)}
                className="underline"
              >
                Edit
              </button>
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="text-red-600"
              >
                Delete
              </button>
            </>
          )}
        </div>

        {/* ---------- COVER ---------- */}
        {post.cover && (
          <img
            src={post?.cover || undefined}
            alt={post.title}
            className="mt-8 w-full rounded-lg object-cover"
          />
        )}

        {/* ---------- CONTENT ---------- */}
        <div className="mt-8">
          {isEditing ? (
            <>
              <textarea
                value={editContent}
                disabled={updating}
                onChange={(e) => setEditContent(e.target.value)}
                rows={14}
                className="w-full resize-none rounded-md border p-4 text-lg leading-8 focus:outline-none disabled:opacity-50"
              />

              <div className="mt-4 flex gap-4">
                <button
                  onClick={handleUpdate}
                  disabled={updating}
                  className={`rounded-full px-6 py-2 text-white ${
                    updating
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black"
                  }`}
                >
                  {updating ? "Updating…" : "Update"}
                </button>

                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditTitle(post.title);
                    setEditContent(post.content);
                  }}
                  disabled={updating}
                  className="text-gray-600 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <div className="whitespace-pre-wrap wrap-break-word text-lg leading-8 text-gray-800">
              {post.content}
            </div>
          )}
        </div>
      </article>

      {/* ---------- DELETE CONFIRM DIALOG ---------- */}
      <ConfirmDialog
        open={showDeleteDialog}
        title="Delete this post?"
        description="This action cannot be undone."
        confirmText="Delete"
        loading={deleting}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default PostPage;
