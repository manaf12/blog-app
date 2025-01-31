const SkeletonLoader = () => {
    return (
      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        {/* First Post Skeleton */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="w-full h-64 bg-gray-200 rounded-3xl animate-pulse"></div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-4 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-24 h-4 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-16 h-4 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div className="w-full h-8 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
  
        {/* Other Posts Skeleton */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="lg:h-1/3 flex justify-between gap-4">
              <div className="w-1/3 aspect-video bg-gray-200 rounded-3xl animate-pulse"></div>
              <div className="w-2/3">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-24 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                <div className="w-full h-6 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default SkeletonLoader;