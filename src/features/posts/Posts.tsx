import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import PostCard from "../../components/PostCard";
import api from "../../lib/axios";
import PostCardSkeleton from "../../components/skeleton/PostCardSkeleton";

interface Post {
  _id: string;
  title: string;
  content: string;
  cover?: string;
  author?: {
    fullName: string;
  };
  createdAt: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (error) {
        toast.error("Failed to load posts");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  /* ---------- SKELETON STATE ---------- */
  if (loading) {
    return (
      <>
        {Array.from({ length: 5 }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </>
    );
  }

  /* ---------- EMPTY STATE ---------- */
  if (posts.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-10">
        No posts yet.
      </p>
    );
  }

  return (
  <div
    className="
      flex flex-col
      gap-8 sm:gap-0
      px-0
    "
  >
    {posts.map((post) => (
      <Link
        key={post._id}
        to={`/post/${post._id}`}
        className="block"
      >
        <PostCard
          id={post._id}
          title={post.title}
          description={
            post.content.length > 140
              ? post.content.slice(0, 140) + "…"
              : post.content
          }
          // imageUrl={
          //   post.cover
          //     ? `${import.meta.env.VITE_API_URL}/${post.cover}`
          //     : undefined
          // }
          imageUrl={post.cover || undefined}

          author={post.author?.fullName || "Anonymous"}
          date={new Date(post.createdAt).toLocaleDateString()}
        />
      </Link>
    ))}
  </div>
);

  
};

export default Posts;
