import { Link, useParams } from "react-router-dom";
import Image from "../components/Image";
import Search from "../components/Search";
import Comments from "../components/Comments";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import DOMPurify from 'dompurify';


const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isLoading) return "Loading...";
  if (error) return `Something went wrong! ${error.message}`;
  if (!data) return "Post not found!";

  // Destructure data
  const { title, category, createdAt, desc: description, user, img: postImg, content } = data;
  const { username, img: userImg } = user || {};

  return (
    <div className="flex flex-col gap-8">
      {/* Detail Section */}
      <div className="flex gap-8 animate-fade-in-down">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold opacity-0 animate-fade-in-up delay-100">
            {title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm opacity-0 animate-fade-in delay-300">
            <span>Written by</span>
            <Link className="text-blue-800 hover:underline transition-colors">{username}</Link>
            <span>on</span>
            <Link className="text-blue-800 hover:underline transition-colors">{category}</Link>
            <span>{format(createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium opacity-0 animate-fade-in delay-500">
            {description}
          </p>
        </div>
        
        {postImg && (
          <div className="hidden lg:block w-2/5 opacity-0 animate-slide-in-right">
            <Image 
              src={postImg} 
              w="600" 
              className="rounded-2xl hover:scale-[1.02] transition-transform duration-300" 
            />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row gap-12 justify-between">
        {/* Text Content */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify opacity-0 animate-fade-in delay-700">
          <div 
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content || "") }}
            className="[&_img]:rounded-xl [&_img]:my-4 [&_img:hover]:scale-[1.01] [&_img]:transition-transform [&_img]:duration-300"
          />
        </div>

        {/* Sidebar Menu */}
        <div className="px-4 h-max sticky top-8 opacity-0 animate-slide-in-left delay-1000">
          {/* Author Section */}
          <div className="mb-8">
            <h1 className="mb-4 text-sm font-medium">Author</h1>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-8 group">
                {userImg && (
                  <Image
                    src={userImg}
                    className="w-12 h-12 rounded-full object-cover group-hover:scale-105 transition-transform"
                    w="48"
                    h="48"
                  />
                )}
                <Link className="text-blue-800 hover:text-blue-900 transition-colors">
                  {username}
                </Link>
              </div>
              <p className="text-sm text-gray-500 opacity-0 animate-fade-in delay-1200">
                Bio or additional info about the author can go here.
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h1 className="mb-4 text-sm font-medium">Categories</h1>
            <div className="flex flex-col gap-2 text-sm">
              {['All', 'Web Design', 'Development', 'Databases', 'Search Engines', 'Marketing'].map((cat, index) => (
                <Link 
                  key={cat}
                  className="underline opacity-0 animate-fade-in-right"
                  style={{ animationDelay: `${index * 50 + 1200}ms` }}
                  to="/"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="opacity-0 animate-fade-in-up delay-1500">
            <h1 className="mb-4 text-sm font-medium">Search</h1>
            <Search />
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="opacity-0 animate-fade-in delay-1700">
        <Comments postId={data._id} />
      </div>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.4s ease-out forwards;
        }

        .delay-100 { animation-delay: 100ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-1000 { animation-delay: 1000ms; }
        .delay-1200 { animation-delay: 1200ms; }
        .delay-1500 { animation-delay: 1500ms; }
        .delay-1700 { animation-delay: 1700ms; }
      `}</style>
    </div>
  );
};

export default SinglePostPage;