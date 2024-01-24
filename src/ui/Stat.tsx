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
    <div className="flex flex-col items-center p-4 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition duration-300">
      <div className="my-2">{icon}</div>
      <h5 className="text-lg font-semibold mb-1">{title}</h5>
      <p className="text-md font-semibold">{value?.toString()}</p>
    </div>
  );
}

export default Stat;
