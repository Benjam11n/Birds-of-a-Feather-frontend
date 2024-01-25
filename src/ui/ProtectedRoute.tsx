import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../features/users/useCurrentUser";
import Spinner from "./Spinner";
import { ReactNode, useEffect } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  // 1. Load the authenticated user
  const { currentUser, isLoading, fetchStatus } = useCurrentUser();

  // 2. If there is no authenticated user, redirect to login
  useEffect(
    function () {
      if (!currentUser && !isLoading && fetchStatus !== "fetching") {
        navigate("/login");
      }
    },
    [currentUser, navigate, isLoading, fetchStatus]
  );

  // 3. While loading, show spinner
  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  // 4. If there is a user, render the app
  return children;
}

export default ProtectedRoute;
