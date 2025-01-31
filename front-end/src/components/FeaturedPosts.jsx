import { Link } from "react-router-dom";
import Image from "./Image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import { useMemo } from "react";
import SkeletonLoader from "./SkeletonLoader";

// Fetch posts function
const fetchPost = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`
  );
  return res.data;
};

// Helper function to calculate animation delays
const getAnimationDelay = (index) => `${index * 200 + 300}ms`;

const FeaturedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: fetchPost,
  });

  // Memoize posts to avoid recalculating on every render
  const posts = useMemo(() => data?.posts || [], [data]);

  if (isPending) return <SkeletonLoader />;
  if (error) return "Something went wrong!" + error.message;
  if (posts.length === 0) return null;

  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* First Post */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4 animate-slide-in-left">
        {posts[0].img && (
          <Image
            src={posts[0].img}
            className="rounded-3xl object-cover hover:scale-[1.01] transition-transform duration-300"
            w="895"
            loading="lazy"
          />
        )}
        <div className="flex items-center gap-4 opacity-0 animate-fade-in delay-300">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link className="text-blue-800 lg:text-lg hover:underline">
            {posts[0].category}
          </Link>
          <span className="text-gray-500">{format(posts[0].createdAt)}</span>
        </div>
        <Link
          to={posts[0].slug}
          className="text-xl lg:text-3xl font-semibold lg:font-bold hover:text-blue-800 transition-colors opacity-0 animate-fade-in-up delay-500"
        >
          {posts[0].title}
        </Link>
      </div>

      {/* Other Posts */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {posts.slice(1, 4).map((post, index) => (
          <div
            key={post._id}
            className="lg:h-1/3 flex justify-between gap-4 opacity-0 animate-slide-in-right"
            style={{ animationDelay: getAnimationDelay(index) }}
          >
            {post.img && (
              <div className="w-1/3 aspect-video group overflow-hidden">
                <Image
                  src={post.img}
                  className="rounded-3xl object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  w="298"
                  loading="lazy"
                />
              </div>
            )}
            <div className="w-2/3">
              <div className="flex items-center gap-4 text-sm lg:text-base mb-4 opacity-0 animate-fade-in delay-500">
                <h1 className="font-semibold">0{index + 2}.</h1>
                <Link className="text-blue-800 hover:underline">
                  {post.category}
                </Link>
                <span className="text-gray-500 text-sm">
                  {format(post.createdAt)}
                </span>
              </div>
              <Link
                to={`/${post.slug}`}
                className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium hover:text-blue-800 transition-colors"
              >
                {post.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;