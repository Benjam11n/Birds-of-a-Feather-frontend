import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

function PageNotFound() {
  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
      <nav>
        <NavLink to="/">
          <Button>Go back</Button>
        </NavLink>
      </nav>
    </div>
  );
}

export default PageNotFound;
