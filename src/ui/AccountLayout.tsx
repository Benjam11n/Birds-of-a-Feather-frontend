// External imports
import { Outlet, useNavigate } from "react-router-dom";
import { format } from "date-fns";

// Internal imports
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Spinner from "@/ui/Spinner";
import AdditionalInformation from "@/ui/AdditionalInformation";
import { useCurrentUser } from "@/features/users/useCurrentUser";
import { useFollowing } from "@/features/following/useFollowing";
import { BACKEND_URL } from "@/utils/constants";

function AccountLayout() {
  const navigate = useNavigate();
  const { currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const { followings, isLoading: isLoadingFollowing } = useFollowing();

  const { name, avatarUrl, userBio, CreatedAt } = currentUser!;
  const followerNumber =
    followings?.filter((user) => user.ID === currentUser?.ID).length || 0;

  // Loading spinner while data is being fetched
  if (isLoadingCurrentUser || isLoadingFollowing) return <Spinner />;

  return (
    <div className="grid grid-cols-[1fr_auto] grid-rows-[auto_auto_1fr]">
      {/* Navigation Buttons */}
      <div className="col-span-2 mx-4 my-3 flex flex-row justify-end space-x-2">
        <Button variant="outline" onClick={() => navigate("./details")}>
          Account Details
        </Button>
        <Button variant="outline" onClick={() => navigate("./statistics")}>
          Account Statistics
        </Button>
      </div>

      {/* User Information Section */}
      <div className="col-span-2 items-center gap-6 border-b border-border px-4 py-8 grid grid-rows-[auto_1fr] grid-cols-[auto_auto_auto_auto_1fr]">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={avatarUrl ? BACKEND_URL + avatarUrl : "/default_avatar.jpg"}
          ></AvatarImage>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl">{name}</h1>
        <h2 className="text-muted-foreground">
          Joined since: {format(CreatedAt, "MMMM dd yyyy")}
        </h2>
        <h2 className="text-muted-foreground">Followers: {followerNumber}</h2>
        <Button
          onClick={() => navigate("/editAccount")}
          className="w-[180px]"
          variant="outline"
        >
          Update Your Account
        </Button>
        <h3 className="col-span-5 text-lg ml-32 mr-48">{userBio}</h3>
      </div>

      {/* Main Content */}
      <main className="mx-4 my-4">
        <Outlet />
      </main>

      <div className="ml-6 mr-24 mt-8">
        <AdditionalInformation user={currentUser} />
      </div>
    </div>
  );
}

export default AccountLayout;
