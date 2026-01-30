import { FaUser } from "react-icons/fa";

interface PostCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  author: string;
  date: string;
}

const gradients = [
  "from-slate-100 to-slate-200",
  "from-gray-100 to-gray-200",
  "from-zinc-100 to-zinc-200",
  "from-neutral-100 to-neutral-200",
  "from-stone-100 to-stone-200",
  "from-indigo-50 to-indigo-100",
  "from-blue-50 to-blue-100",
  "from-emerald-50 to-emerald-100",
];

const getGradient = (seed: string) => {
  const index =
    seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    gradients.length;
  return gradients[index];
};

const PostCard = ({
  id,
  title,
  description,
  imageUrl,
  author,
  date,
}: PostCardProps) => {
  return (
    <article
      className="
        flex flex-col sm:flex-row
        gap-4 sm:gap-6
        py-6
        border-b border-gray-100
        transition
        sm:hover:bg-gray-50
      "
    >
      {/* ---------- TEXT ---------- */}
      <div className="flex-1 min-w-0">
        {/* Meta */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-2">
          <FaUser className="text-[10px]" />
          <span className="font-medium text-gray-700">
            {author}
          </span>
          <span>·</span>
          <span>{date}</span>
        </div>

        {/* Title */}
        <h2 className="text-lg sm:text-2xl font-semibold leading-snug line-clamp-2">
          {title}
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      {/* ---------- IMAGE ---------- */}
      <div className="w-full sm:w-40 shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-40 sm:h-28 w-full rounded-lg object-cover"
          />
        ) : (
          <div
            className={`h-40 sm:h-28 w-full rounded-lg bg-linear-to-br ${getGradient(
              id
            )} flex items-center justify-center text-gray-400`}
          >
            <span className="text-xs font-medium uppercase tracking-wide">
              Article
            </span>
          </div>
        )}
      </div>
    </article>
  );
};

export default PostCard;
