import Spinner from "@/ui/Spinner";
import { usePosts } from "../Posts/usePosts";
import PostRow from "../Posts/PostRow";
import { post, users } from "@/types/allTypes";
import { useFollowing } from "../following/useFollowing";
import AdditionalInformation from "@/ui/AdditionalInformation";
import { useCommunities } from "../communities/useCommunities";
import Pagination from "@/ui/Pagination";
import { useAllCommuntiyMembers } from "../communities/useAllCommunityMembers";

function FypTable() {
  const { posts, isLoading } = usePosts();
  const { followings, isLoading: isLoadingFollowing } = useFollowing();
  const { communities, isLoading: isLoadingCommunities } = useCommunities();

  const followingPosts = posts?.filter((post: post) => {
    const followingId = followings?.map((follower: users) => follower.ID);
    return followingId?.includes(post.userId);
  });

  const { isLoading: isLoadingCommunityMembers, communityMembers } =
    useAllCommuntiyMembers();

  const sortedCommunities = communities?.sort((a, b) => {
    const aMembers = communityMembers?.filter(
      (communityMember) => communityMember.communityId === a.ID
    );
    const bMembers = communityMembers?.filter(
      (communityMember) => communityMember.communityId === b.ID
    );
    return (bMembers?.length || 0) - (aMembers?.length || 0);
  });

  if (
    isLoading ||
    isLoadingFollowing ||
    isLoadingCommunities ||
    isLoadingCommunityMembers
  )
    return <Spinner />;

  return (
    <div className="grid grid-cols-[1fr_auto] space-y-2">
      <div>
        {followingPosts?.map((post: post) => {
          return <PostRow post={post} />;
        })}
      </div>
      <div className="ml-6 mr-24 mt-12">
        <AdditionalInformation popularCommunities={sortedCommunities} />
      </div>
      <div>
        <Pagination />
      </div>
    </div>
  );
}

export default FypTable;
