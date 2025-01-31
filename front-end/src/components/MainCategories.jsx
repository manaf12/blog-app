import { Link } from "react-router-dom";
import Search from "./Search";

const MainCategories = () => {
  return (
    <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8 opacity-0 animate-fade-in delay-700">
      {/* links */}
      <div className="flex-1 flex items-center justify-between flex-wrap gap-4">
        <Link
          to="/posts"
          className="bg-blue-800 text-white rounded-full px-4 py-2"
          aria-label="View all posts"
        >
          All Posts
        </Link>
        <Link
          to="/posts?cat=web-design"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
          aria-label="View web design posts"
        >
          Web Design
        </Link>
        <Link
          to="/posts?cat=development"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
          aria-label="View development posts"
        >
          Development
        </Link>
        <Link
          to="/posts?cat=databases"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
          aria-label="View database posts"
        >
          Databases
        </Link>
        <Link
          to="/posts?cat=seo"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
          aria-label="View SEO posts"
        >
          Search Engines
        </Link>
        <Link
          to="/posts?cat=marketing"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
          aria-label="View marketing posts"
        >
          Marketing
        </Link>
      </div>
      {/* search */}
      <div className="hidden md:flex items-center gap-4">
        <span className="text-xl font-medium">|</span>
        <Search />
      </div>
    </div>
  );
};

export default MainCategories;