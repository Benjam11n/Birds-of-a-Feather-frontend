import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

function Pagination({ count }: { count: number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", `${next}`);
    setSearchParams(searchParams);
  }
  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", `${prev}`);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="w-56 h-16 gap-2 grid grid-rows-2 grid-cols-2 mb-12 mt-6 col-span-2">
      <p className="col-span-2 ml-2">
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage * PAGE_SIZE > count ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span>{count}</span> results
      </p>

      <Button variant="ghost" onClick={prevPage} disabled={currentPage === 1}>
        <FiChevronLeft />
        <span>Prev</span>
      </Button>

      <Button
        variant="ghost"
        onClick={nextPage}
        disabled={currentPage === pageCount}
      >
        <span>Next</span>
        <FiChevronRight />
      </Button>
    </div>
  );
}

export default Pagination;
