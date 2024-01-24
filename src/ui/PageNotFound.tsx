import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "./DarkModeProvider";

function PageNotFound() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <img
          src={"page_not_found_" + `${theme}` + ".jpg"}
          alt="Page not found illustration"
          className="max-w-md mx-auto mb-4 rounded-lg"
        />
        <p className="text-lg text-gray-600">
          Oops! It seems like the page you are looking for does not exist.
        </p>
        <p className="text-lg text-gray-600">
          Please check the URL or go back to the home page.
        </p>
      </div>
      <NavLink to="/" className="mt-6">
        <Button>Go Back to Home</Button>
      </NavLink>
    </div>
  );
}

export default PageNotFound;
