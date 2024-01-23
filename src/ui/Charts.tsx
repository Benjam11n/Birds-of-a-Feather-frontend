import { useTheme } from "./darkModeProvider";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { Post } from "@/types/allTypes";
import { useSearchParams } from "react-router-dom";

function Charts({ creatorPosts }: { creatorPosts: Post[] }) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("days") || "7";

  const dateIntervals = eachDayOfInterval({
    start: subDays(new Date(), Number(numDays) - 1),
    end: new Date(),
  });

  const data = dateIntervals?.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalViews: creatorPosts
        ?.filter((post) => isSameDay(date, new Date(post.createdAt)))
        .reduce((acc: number, post: Post) => acc + post.views, 0),
      totalVotes: creatorPosts
        ?.filter((post) => isSameDay(date, new Date(post.createdAt)))
        .reduce((acc: number, post: Post) => acc + post.votes, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalViews: { stroke: "#4f46e5", fill: "#4f46e5" },
        totalVotes: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalViews: { stroke: "#4f46e5", fill: "#c7d2fe" },
        totalVotes: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <div className="col-span-3 rounded-md bg-accent px-8 py-6">
      <h2 className="mb-4 text-xl font-bold">
        Views/ Votes from {format(dateIntervals.at(0) || "", "MMM dd yyyy")}{" "}
        &mdash; {format(dateIntervals.at(-1) || "", "MMM dd yyyy")}
      </h2>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalViews"
            type="monotone"
            stroke={colors.totalViews.stroke}
            fill={colors.totalViews.fill}
            strokeWidth={3}
            name="Total Views"
            unit=" views"
          />

          <Area
            dataKey="totalVotes"
            type="monotone"
            stroke={colors.totalVotes.stroke}
            fill={colors.totalVotes.fill}
            strokeWidth={3}
            name="Total Votes"
            unit=" votes"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Charts;
