import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center px-4 sm:px-6">
      {/* ---------- HERO ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl mx-auto text-center"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
          Write without noise.
        </h1>

        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 leading-relaxed">
          A calm, developer-first space to publish ideas,
          long-form thoughts, and technical stories —
          designed to keep the focus on writing and reading.
        </p>

        {/* ---------- CTA ---------- */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <Link
            to="/register"
            className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-900 transition text-center"
          >
            Start writing
          </Link>

          <Link
            to="/posts"
            className="text-sm font-medium text-gray-600 hover:text-black transition text-center py-3"
          >
            Read posts
          </Link>
        </div>
      </motion.div>

      {/* ---------- VALUES ---------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 sm:mt-24 max-w-4xl mx-auto grid gap-10 sm:gap-14 md:grid-cols-3 text-center"
      >
        <div>
          <h3 className="text-sm sm:text-base font-medium">
            Focused writing
          </h3>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            No clutter, no unnecessary formatting tools —
            just a clean editor built for words.
          </p>
        </div>

        <div>
          <h3 className="text-sm sm:text-base font-medium">
            Built for developers
          </h3>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Designed with developers in mind — from reading
            experience to publishing workflow.
          </p>
        </div>

        <div>
          <h3 className="text-sm sm:text-base font-medium">
            Comfortable reading
          </h3>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Clean typography and spacing that make long-form
            posts easy to read and revisit.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;
