"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchScores = async () => {
  const response = await axios.get("/api/highscore/getScores");
  return response.data;
};

export default function TopScoreContainer() {
  const { data, isLoading } = useQuery({
    queryFn: fetchScores,
    queryKey: ["get-scores"],
  });

  console.log(data);
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Top Score Container</h2>
      {data.map((top) => (
        <div>
          {top.score} - {top.userName}
        </div>
      ))}
    </div>
  );
}
