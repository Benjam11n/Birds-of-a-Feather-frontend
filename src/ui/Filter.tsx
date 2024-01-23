import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Filter({
  filterField,
  options,
}: {
  filterField: string;
  options: Array<{ value: string; label: string }>;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || "all";

  function handleClick(value: string) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex justify-center gap-1">
      {options.map((option) => (
        <Button
          variant="outline"
          onClick={() => handleClick(option.value)}
          key={option.label}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

export default Filter;
