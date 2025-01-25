import { Link } from "react-router-dom";
import Image from "./Image";
import { format } from "timeago.js";
import FeatureToggle from "./FeatureToggle";

const PostListItem = ({ post }) => {
  const title = post?.title || "Untitled Post";
  const slug = post?.slug || "#";
  const imgSrc = post?.img;
  const username = post?.user?.username || "Unknown Author";
  const category = post?.category || "Uncategorized";
  const createdAt = post?.createdAt || new Date();
  const description = post?.desc || "No description available.";

  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-12">
      {/* image */}
      {imgSrc && (
        <div className="md:hidden xl:block xl:w-1/3">
          <Image src={imgSrc} className="rounded-2xl object-cover" w="735" />
        </div>
      )}
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to={`/${slug}`} className="text-4xl font-semibold">
          {title}
        </Link>
        <FeatureToggle postId={post._id} isFeatured={post.isFeatured} />
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link className="text-blue-800" to={`/posts?author=${username}`}>
            {username}
          </Link>
          <span>on</span>
          <Link className="text-blue-800">{category}</Link>
          <span>{format(createdAt)}</span>
        </div>
        <p>{description}</p>
        <Link to={`/${slug}`} className="underline text-blue-800 text-sm">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
