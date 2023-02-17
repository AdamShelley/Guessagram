"use client";

import { useState } from "react";
import ScoreContainer from "./ScoreContainer";

interface WordProps {
  completeWord: string;
}

export default function SubmitButton({ completeWord }: WordProps) {
  const [correctWordlist, setCorrectWordlist] = useState<string[]>([]);
  const [error, setError] = useState("");

  const getWord = async () => {
    if (completeWord === "") {
      console.log("No word entered");
    }

    console.log("Fetching from API");

    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${completeWord}`
    );

    const data = await res.json();
    console.log(data);

    if (data.title === "No Definitions Found") {
      return setError("Not a real word");
    }

    setCorrectWordlist((prev) => [...prev, data[0].word]);
    setError("");
  };

  return (
    <>
      <button type="submit" onClick={getWord} className="rounded bg-black p-2">
        Submit answer
      </button>
      {error && <p>{error}</p>}
      <ScoreContainer correctWordlist={correctWordlist} />
    </>
  );
}
