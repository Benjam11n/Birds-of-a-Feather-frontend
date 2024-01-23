import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function PostTableOperations() {
  return (
    <div className="flex flex-row justify-end gap-2">
      <Filter
        filterField="created_at"
        options={[
          { value: "all", label: "All" },
          { value: "today", label: "Today" },
          { value: "this-week", label: "This week" },
          { value: "this-month", label: "This month" },
        ]}
      />

      <SortBy
        options={[
          { value: "created_at-asc", label: "Oldest" },
          { value: "created_at-desc", label: "Latest" },
          { value: "votes-asc", label: "Sort by likes (low first)" },
          { value: "votes-desc", label: "Sort by likes (high first)" },
        ]}
      />
    </div>
  );
}

export default PostTableOperations;
