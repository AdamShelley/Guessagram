"use client";

import { useState } from "react";
import ScoreContainer from "./ScoreContainer";

interface WordProps {
  completeWord: string;
  setWord: (word: string) => void;
}

export default function SubmitButton({ completeWord, setWord }: WordProps) {
  const [correctWordlist, setCorrectWordlist] = useState<string[]>([]);
  const [error, setError] = useState("");

  const getWord = async () => {
    if (completeWord === "") {
      console.log("No word entered");
    }

    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${completeWord}`
    );

    const data = await res.json();

    if (data.title === "No Definitions Found") {
      return setError("Not a real word");
    }

    if (correctWordlist.includes(data[0].word)) {
      return setError("Already added that word!");
    }

    setCorrectWordlist((prev) => [...prev, data[0].word]);
    setError("");

    setWord("");
  };

  return (
    <div className="flex flex-col align-center justify-center">
      <button
        type="submit"
        onClick={getWord}
        className="text-sm bg-teal-900 text-white py-2 px-6 rounded disabled:opacity-25 self-center"
      >
        Submit answer
      </button>
      <div className="mt-3 order-2 border-rose-500 self-center">
        {error && <p className="text-red-300">{error}</p>}
      </div>
      {correctWordlist.length >= 1 && (
        <ScoreContainer correctWordlist={correctWordlist} />
      )}
    </div>
  );
}
