"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Scores = {
  userName: string;
  score: number;
};

const fetchScores = async () => {
  const response = await axios.get("/api/highscore/getScores");
  return response.data;
};

export default function TopScoreContainer() {
  const { data, isLoading } = useQuery({
    queryFn: fetchScores,
    queryKey: ["get-scores"],
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl my-5 mt-20">High Scores</h2>
      <table className="w-full table-auto border-separate border-spacing-1 border-spacing-y-2 border border-slate-500">
        <thead>
          <tr>
            <th className="p-2 border border-slate-600">Score</th>
            <th className="p-2 border border-slate-600">Name</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((top: Scores) => (
            <tr key={`${top.userName}-${top.score}`}>
              <td className="p-2 border border-slate-600">{top.score}</td>
              <td className="p-2 border border-slate-600">{top.userName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
