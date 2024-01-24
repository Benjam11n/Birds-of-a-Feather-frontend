import { useTheme } from "./DarkModeProvider";
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
import { post } from "@/types/allTypes";
import { useSearchParams } from "react-router-dom";

function Charts({ creatorPosts }: { creatorPosts: post[] }) {
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
        ?.filter((post) => isSameDay(date, new Date(post.CreatedAt)))
        .reduce((acc: number, post: post) => acc + post.views, 0),
      totalVotes: creatorPosts
        ?.filter((post) => isSameDay(date, new Date(post.CreatedAt)))
        .reduce((acc: number, post: post) => acc + post.votes, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalViews: { stroke: "#5850fd", fill: "#4b41ff" },
        totalVotes: { stroke: "#7624ac", fill: "#7624ac" },
        text: "#e3e3e3",
        background: "#25182d",
      }
    : {
        totalViews: { stroke: "#4b41ff", fill: "#c7d2ff" },
        totalVotes: { stroke: "#892cc7", fill: "#fee4ff" },
        text: "#272e39",
        background: "#fff",
      };

  return (
    <div className="col-span-3 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition duration-300 px-8 py-6">
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
