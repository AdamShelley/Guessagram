"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

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
  const [showBestWord, setShowBestWord] = useState(false);
  const [userName, setUserName] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryFn: fetchScores,
    queryKey: ["get-scores"],
  });

  useEffect(() => {
    const submitted = JSON.parse(localStorage.getItem("word-flow-submit")!);
    if (!submitted) {
      setShowBestWord(false);
    } else {
      setShowBestWord(true);
      setUserName(submitted?.userName);
    }
  }, [data]);

  return (
    <tbody>
      {/* Make a comp here? */}
      {!isLoading &&
        data?.map((top: Scores, index: number) => (
          <tr key={`${top.userName}-${top.score}`}>
            <td className="text-center p-2 border border-slate-600  whitespace-nowrap">
              {index + 1}
            </td>
            <td className="text-center p-2 border border-slate-600  whitespace-nowrap">
              {showBestWord ? top.score : "?"}
            </td>
            <td
              className={`text-center p-2 border border-slate-600  whitespace-nowrap
            ${
              top.userName === userName
                ? "border-dashed border-2 border-slate-400"
                : ""
            }`}
            >
              {top.userName}
            </td>
            <td className="text-center p-2 border border-slate-600">
              {showBestWord ? top.highestScore.toUpperCase() : "- - - - - -"}
            </td>
          </tr>
        ))}
      {isLoading && (
        <tr>
          <td className="text-center">Loading...</td>
        </tr>
      )}
      {!isLoading && data.length < 1  && (
        <tr className="text-center">
          <td className="text-center" colSpan={4}>
            <p className="mt-5">Nobody has submitted their score yet!</p>
          </td>
        </tr>
      )}
    </tbody>
  );
}
