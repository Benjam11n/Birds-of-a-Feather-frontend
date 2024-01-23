import Spinner from "@/ui/Spinner";
import { useCommunities } from "./useCommunities";
import { community } from "@/types/allTypes";
import CommunityRow from "./CommunityRow";
import CreateCommunity from "./CreateCommunity";
import { useAllCommuntiyMembers } from "./useAllCommunityMembers";

function CommunityList() {
  const { communities, isLoading: isLoadingCommunities } = useCommunities();
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

  if (isLoadingCommunities || isLoadingCommunityMembers) return <Spinner />;
  return (
    <div className="grid grid-cols-[1fr_auto] space-y-2 space-x-4">
      <div className="space-y-3">
        <h1 className="mb-6 mt-8 flex justify-center font-semibold col-span-2">
          Top Communities of Birds of a feather
        </h1>
        {sortedCommunities &&
          sortedCommunities.map((community: community, index: number) => (
            <CommunityRow
              community={community}
              ranking={index + 1}
              key={community.ID}
            />
          ))}
      </div>
      <div className="ml-6 mr-24 pt-16">
        <CreateCommunity />
      </div>
    </div>
  );
}

export default CommunityList;
