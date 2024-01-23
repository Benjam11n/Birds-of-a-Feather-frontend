import { useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = () => {
    searchParams.set("search", search);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  return (
    <div className="flex max-w-[600px] items-center justify-center space-x-2">
      <Input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-[450px]"
      />

      <Button onClick={handleSearch} className="p-2 w-10 rounded-xl">
        <FiSearch />
      </Button>
    </div>
  );
}
