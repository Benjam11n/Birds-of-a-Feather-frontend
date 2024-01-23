import Spinner from "@/ui/Spinner";
import { useCommunity } from "./useCommunity";

import CommunityHeader from "./CommunityHeader";
import { post } from "@/types/allTypes";
import { usePosts } from "../Posts/usePosts";
import PostTableOperations from "../Posts/PostTableOperations";
import PostRow from "../Posts/PostRow";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "@/utils/constants";
import Pagination from "@/ui/Pagination";
import CommunityDescription from "./CommunityDescription";

function CommunityHomepage() {
  const { community, isLoading: isLoadingCommunity } = useCommunity();
  const { posts, isLoading: isLoadingPosts } = usePosts();
  const [searchParams] = useSearchParams();
  const communityPosts: post[] =
    posts?.filter((post: post) => post.communityId === community?.ID) || [];

  if (isLoadingCommunity || isLoadingPosts) return <Spinner />;

  if (!community) return;

  //1. filter
  const filterValue = searchParams.get("created_at") || "all";

  let filteredPosts;
  if (filterValue === "all") filteredPosts = communityPosts;
  if (filterValue === "today") {
    const secondsInADay = 86400;
    filteredPosts = posts?.filter((post: post) => {
      const date = new Date(post.CreatedAt);
      return (
        Math.abs(new Date().getTime() - date.getTime()) < secondsInADay * 1000
      );
    });
  }
  if (filterValue === "this-week") {
    const secondsInAWeek = 604800;
    filteredPosts = posts?.filter((post: post) => {
      const date = new Date(post.CreatedAt);
      return (
        Math.abs(date.getTime() - new Date().getTime()) < secondsInAWeek * 1000
      );
    });
  }
  if (filterValue === "this-month") {
    const secondsInAMonth = 604800 * 30;
    filteredPosts = posts?.filter((post: post) => {
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
    <div className="grid grid-cols-[1fr_auto] grid-rows-[auto_1fr]">
      <CommunityHeader community={community} />
      <div className="mx-4 my-4 space-y-3">
        <PostTableOperations />
        {paginatedPosts &&
          paginatedPosts?.map((post: post) => (
            <PostRow post={post} key={post.ID} />
          ))}
      </div>
      <div className="ml-6 mr-24 mt-3">
        <CommunityDescription community={community} />
      </div>
      <Pagination count={count} />
    </div>
  );
}
export default CommunityHomepage;
