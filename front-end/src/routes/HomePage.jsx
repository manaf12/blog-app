import { Link } from "react-router-dom";
import MainCategories from "../components/MainCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";

const HomePage = () => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* BREADCRUMB */}
      <div className="flex gap-4 animate-fade-in">
        <Link to="/" className="hover:text-blue-800 transition-colors">Home</Link>
        <span>•</span>
        <span className="text-blue-800">Blogs and Articles</span>
      </div>

      {/* INTRODUCTION */}
      <div className="flex items-center justify-between">
        {/* titles */}
        <div className="animate-slide-in-right">
          <h1 className="text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold space-y-4">
            <span className="inline-block opacity-0 animate-fade-in-up delay-100">
              Create a blog
            </span>
            <span className="inline-block opacity-0 animate-fade-in-up delay-300">
              Share your story with the world
            </span>
          </h1>
          <p className="mt-8 text-md md:text-xl opacity-0 animate-fade-in delay-500">
            Create your own beautiful blog.
          </p>
        </div>

        {/* animated button */}
        <Link 
          to="write" 
          className="hidden md:block relative group hover:scale-105 transition-transform"
        >
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            className="text-lg tracking-widest animate-spin-slow"
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">
                Write your story •
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                Share your idea •
              </textPath>
            </text>
          </svg>
          <button className="absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center 
            hover:bg-blue-900 transition-colors shadow-lg hover:shadow-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="none"
              stroke="white"
              strokeWidth="2"
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </button>
        </Link>
      </div>

      {/* CATEGORIES */}
      <MainCategories className="opacity-0 animate-fade-in delay-700" />

      {/* FEATURED POSTS */}
      <FeaturedPosts className="opacity-0 animate-fade-in delay-1000" />

      {/* POST LIST */}
      <div className="opacity-0 animate-slide-in-left delay-1200">
        <h1 className="my-8 text-2xl text-gray-600">Recent Posts</h1>
        <PostList/>
      </div>
    </div>
  );
};

export default HomePage;
