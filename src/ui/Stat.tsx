import { ReactElement } from "react";

function Stat({
  title,
  icon,
  value,
}: {
  title: string;
  icon: ReactElement;
  value: string | number;
}) {
  return (
    <div className="grid grid-cols-[5.4rem_1fr] grid-rows-[auto_auto] gap-y-2 rounded-md bg-accent p-[1.6rem]">
      <div className="row-span-2 flex items-center justify-center">{icon}</div>
      <h5 className="text-md font-semibold">{title}</h5>
      <p>{value?.toString()}</p>
    </div>
  );
}

export default Stat;
