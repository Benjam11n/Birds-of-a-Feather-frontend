import { usePosts } from "./usePosts";
import Spinner from "../../ui/Spinner";
import PostRow from "./PostRow";
import { useSearchParams } from "react-router-dom";
import Pagination from "@/ui/Pagination";
import { PAGE_SIZE } from "../../utils/constants";
import { post, postVote } from "../../types/allTypes";
import AdditionalInformation from "@/ui/AdditionalInformation";
import { useCommunities } from "../communities/useCommunities";
import { useAllCommuntiyMembers } from "../communities/useAllCommunityMembers";
import { useAllPostVotes } from "./useAllPostVotes";

function PostTable() {
  const [searchParams] = useSearchParams();
  const { communities, isLoading: isLoadingCommunities } = useCommunities();
  const { isLoading: isLoadingPostVotes, postVotes } = useAllPostVotes();

  const { isLoading: isLoadingPosts, posts } = usePosts();

  const { isLoading: isLoadingCommunityMembers, communityMembers } =
    useAllCommuntiyMembers();
  if (!posts) return; // change this

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
    isLoadingPosts ||
    isLoadingCommunities ||
    isLoadingCommunityMembers ||
    isLoadingPostVotes
  )
    return <Spinner />;

  //1. filter
  const filterValue = searchParams.get("created_at") || "all";

  let filteredPosts;
  if (filterValue === "all") filteredPosts = posts;
  if (filterValue === "today") {
    const secondsInADay = 86400;
    filteredPosts = posts.filter((post: post) => {
      const date = new Date(post.CreatedAt);
      return (
        Math.abs(new Date().getTime() - date.getTime()) < secondsInADay * 1000
      );
    });
  }
  if (filterValue === "this-week") {
    const secondsInAWeek = 604800;
    filteredPosts = posts.filter((post: post) => {
      const date = new Date(post.CreatedAt);
      return (
        Math.abs(date.getTime() - new Date().getTime()) < secondsInAWeek * 1000
      );
    });
  }
  if (filterValue === "this-month") {
    const secondsInAMonth = 604800 * 30;
    filteredPosts = posts.filter((post: post) => {
      const date = new Date(post.CreatedAt);
      return (
        Math.abs(date.getTime() - new Date().getTime()) < secondsInAMonth * 1000
      );
    });
  }

  // 2. sort
  const sortBy = searchParams.get("sortBy") || "latest";
  const [field, direction] = sortBy.split("-");
  const modifier: number = direction === "asc" ? 1 : -1;
  const sortedPosts =
    filteredPosts &&
    filteredPosts.sort((a: post, b: post) => {
      if (field === "created_at") {
        return (
          (new Date(a.CreatedAt).getTime() - new Date(b.CreatedAt).getTime()) *
          modifier
        );
      } else if (field === "votes") {
        const aVotesValue: number = (
          postVotes?.filter(
            (postVote: postVote) => postVote.postId === a.postId
          ) || []
        ).reduce((acc, postVote) => acc + postVote.voteValue, 0);
        const bVotesValue: number = (
          postVotes?.filter(
            (postVote: postVote) => postVote.postId === b.postId
          ) || []
        ).reduce((acc, postVote) => acc + postVote.voteValue, 0);

        return (aVotesValue - bVotesValue) * modifier;
      } else {
        return ((a[field] as number) - (b[field] as number)) * modifier;
      }
    });

  // 3. Search results
  const searchValue = searchParams.get("search");
  const searchResults = searchValue
    ? sortedPosts?.filter((post: post) => {
        return (
          post &&
          (post.content.toLowerCase().includes(searchValue.toLowerCase()) ||
            post.title.toLowerCase().includes(searchValue) ||
            post.tags.toLowerCase().includes(searchValue))
        );
      })
    : sortedPosts;

  // 4. pagination
  const count: number = searchResults?.length || 0;
  const currentPage: number = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const from: number = (currentPage - 1) * PAGE_SIZE;
  const to: number =
    currentPage * PAGE_SIZE > count ? count : currentPage * PAGE_SIZE;
  const paginatedPosts = searchResults?.slice(from, to);

  return (
    <div className="grid grid-cols-[1fr_auto] space-y-2">
      <div>
        {paginatedPosts &&
          paginatedPosts?.map((post: post) => (
            <PostRow post={post} key={post.ID} />
          ))}
      </div>

      <div className="ml-6 mr-24 mt-12">
        <AdditionalInformation popularCommunities={sortedCommunities} />
      </div>
      <div>
        <Pagination count={count} />
      </div>
    </div>
  );
}

export default PostTable;
