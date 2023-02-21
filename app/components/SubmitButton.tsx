"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import ScoreContainer from "./ScoreContainer";

interface WordProps {
  completeWord: string;
  setWord: (word: string) => void;
}

export default function SubmitButton({ completeWord, setWord }: WordProps) {
  const [correctWordlist, setCorrectWordlist] = useState<string[]>([]);
  const [tries, setTries] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const getWord = async () => {
    if (completeWord === "") {
      console.log("No word entered");
    }

    if (tries >= 10) {
      console.log("You have had your max number of words for the day");
      toast.error("You have already provided 10 words, come back tomorrow!");
      return;
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
    setTries((prev) => prev + 1);
    toast("Word Added", {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <div className="flex flex-col align-center justify-center">
      <button
        type="submit"
        onClick={getWord}
        disabled={tries >= 10}
        className="w-6/12 text-sm bg-teal-700 text-white py-2 px-6 rounded disabled:opacity-25 self-center"
      >
        Submit Word
      </button>
      <div className="mt-2">{`${tries}`}/10 words</div>
      <div className="mt-3 order-2 border-rose-500 self-center">
        {error && <p className="text-red-300">{error}</p>}
      </div>
      {correctWordlist.length >= 1 && (
        <ScoreContainer correctWordlist={correctWordlist} />
      )}
    </div>
  );
}
