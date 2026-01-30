const PostPageSkeleton = () => {
  return (
    <article className="mx-auto max-w-4xl px-4 py-10 animate-pulse">
      {/* Title */}
      <div className="h-10 w-3/4 bg-gray-200 rounded mb-4" />

      {/* Meta */}
      <div className="h-4 w-48 bg-gray-200 rounded mb-8" />

      {/* Cover */}
      <div className="h-64 w-full bg-gray-200 rounded-lg mb-8" />

      {/* Content */}
      <div className="space-y-4">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-11/12 bg-gray-200 rounded" />
        <div className="h-4 w-10/12 bg-gray-200 rounded" />
        <div className="h-4 w-9/12 bg-gray-200 rounded" />
      </div>
    </article>
  );
};

export default PostPageSkeleton;
