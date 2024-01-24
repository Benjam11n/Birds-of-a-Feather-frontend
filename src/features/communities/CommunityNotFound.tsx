import { useTheme } from "@/ui/DarkModeProvider";
import { NavLink } from "react-router-dom";
import CreateCommunityForm from "./CreateCommunityForm";

function CommunityNotFound() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">No Communities Available</h1>
        <img
          src={`/community_not_found_${theme}.jpg`}
          alt="Illustration: No Posts Found"
          className="max-w-sm mx-auto mb-4 rounded-lg"
        />
        <p className="text-lg text-gray-600">
          It appears that there are currently no communities available.
        </p>
        <p className="text-lg text-gray-600">
          Why not be the first to share your thoughts and experiences? Create
          your first community now!
        </p>
      </div>
      <NavLink to="/communities" className="mt-6">
        <CreateCommunityForm />
      </NavLink>
    </div>
  );
}

export default CommunityNotFound;
