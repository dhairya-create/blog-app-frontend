const PostCardSkeleton = () => {
  return (
    <article className="flex gap-6 py-6 border-b border-gray-100 animate-pulse">
      {/* Text section */}
      <div className="flex-1 min-w-0 space-y-3">
        {/* Meta */}
        <div className="h-4 w-40 bg-gray-200 rounded" />

        {/* Title */}
        <div className="h-6 w-3/4 bg-gray-200 rounded" />

        {/* Description */}
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
      </div>

      {/* Image */}
      <div className="w-40 shrink-0">
        <div className="h-28 w-full rounded-lg bg-gray-200" />
      </div>
    </article>
  );
};

export default PostCardSkeleton;
