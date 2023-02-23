"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Scores = {
  userName: string;
  score: number;
  highestScore: string;
};

const fetchScores = async () => {
  const response = await axios.get("/api/highscore/getScores");
  return response.data;
};

export default function TopScoreTable() {
  const { data, isLoading } = useQuery({
    queryFn: fetchScores,
    queryKey: ["get-scores"],
  });

  return (
    <tbody>
      {/* Make a comp here? */}
      {!isLoading &&
        data?.map((top: Scores, index: number) => (
          <tr key={`${top.userName}-${top.score}`}>
            <td className="text-center p-2 border border-slate-600">
              {index + 1}
            </td>
            <td className="text-center p-2 border border-slate-600">
              {top.score}
            </td>
            <td className="text-center p-2 border border-slate-600">
              {top.userName}
            </td>
            <td className="text-center p-2 border border-slate-600">
              {top.highestScore}
            </td>
          </tr>
        ))}
      {isLoading && (
        <tr>
          <td className="text-center">Loading...</td>
        </tr>
      )}
    </tbody>
  );
}
