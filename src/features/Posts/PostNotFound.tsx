import { Button } from "@/components/ui/button";
import { useTheme } from "@/ui/DarkModeProvider";
import { NavLink } from "react-router-dom";

function PostNotFound() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">No Posts Available</h1>
        <img
          src={`/post_not_found_${theme}.jpg`}
          alt="Illustration: No Posts Found"
          className="max-w-sm mx-auto mb-4 rounded-lg"
        />
        <p className="text-lg text-gray-600">
          It appears that there are currently no posts available.
        </p>
        <p className="text-lg text-gray-600">
          Why not be the first to share your thoughts and experiences? Create
          your first post now!
        </p>
      </div>
      <NavLink to="/communities" className="mt-6">
        <Button>Join a community and start sharing!</Button>
      </NavLink>
    </div>
  );
}

export default PostNotFound;
