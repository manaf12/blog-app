import { Link } from "react-router-dom";
import Image from "./Image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";

const fetchPost = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`
  );
  return res.data;
};

const FeaturedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchPost(),
  });

  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;

  const posts = data.posts;
  if (!posts || posts.length === 0) {
    return;
  }

  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* First */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4 animate-slide-in-left">
        {/* image */}
        {posts[0].img && <Image
          src={posts[0].img}
          className="rounded-3xl object-cover hover:scale-[1.01] transition-transform duration-300"
          w="895"
        />}
        {/* details */}
        <div className="flex items-center gap-4 opacity-0 animate-fade-in delay-300">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link className="text-blue-800 lg:text-lg hover:underline">{posts[0].category}</Link>
          <span className="text-gray-500">{format(posts[0].createdAt)}</span>
        </div>
        {/* title */}
        <Link
          to={posts[0].slug}
          className="text-xl lg:text-3xl font-semibold lg:font-bold hover:text-blue-800 transition-colors opacity-0 animate-fade-in-up delay-500"
        >
          {posts[0].title}
        </Link>
      </div>

      {/* Others */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* Posts 1-3 with staggered animations */}
        {[posts[1], posts[2], posts[3]].map((post, index) => (
          post && (
            <div 
              key={post._id}
              className="lg:h-1/3 flex justify-between gap-4 opacity-0 animate-slide-in-right"
              style={{ animationDelay: `${index * 200 + 300}ms` }}
            >
              {post.img && (
                <div className="w-1/3 aspect-video group overflow-hidden">
                  <Image
                    src={post.img}
                    className="rounded-3xl object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    w="298"
                  />
                </div>
              )}
              {/* details and title */}
              <div className="w-2/3">
                <div className="flex items-center gap-4 text-sm lg:text-base mb-4 opacity-0 animate-fade-in delay-500">
                  <h1 className="font-semibold">0{index + 2}.</h1>
                  <Link className="text-blue-800 hover:underline">{post.category}</Link>
                  <span className="text-gray-500 text-sm">{format(post.createdAt)}</span>
                </div>
                <Link
                  to={post.slug}
                  className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium hover:text-blue-800 transition-colors"
                >
                  {post.title}
                </Link>
              </div>
            </div>
          )
        ))}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </div>
  );
};

export default FeaturedPosts;