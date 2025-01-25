import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";

const FeatureToggle = ({ postId, isFeatured }) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { user } = useUser();
  const role = user?.publicMetadata?.role || "user";

  if (role !== "admin") return null;
  const { data: featuredCount } = useQuery({
    queryKey: ["featuredCount"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/featured-count`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/posts/feature`,
        { postId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["featuredCount"]);
      queryClient.invalidateQueries(["posts"]);
      toast.success("Post feature status updated!");
    },
    onError: (error) => {
      toast.error(error.response?.data || error.message);
    },
  });

  return (
    <button
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending || (!isFeatured && featuredCount >= 4)}
      className={`px-4 py-2 rounded-lg ${
        isFeatured ? "bg-green-500 hover:bg-green-600" : "bg-gray-200 hover:bg-gray-300"
      } text-white transition-colors`}
    >
      {mutation.isPending ? "Processing..." : isFeatured ? "Featured ★" : "Feature Post"}
    </button>
  );
};

export default FeatureToggle;