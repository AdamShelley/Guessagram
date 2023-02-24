"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

type WordProps = {
  completeWord: string;
  setWord: (word: string) => void;
  setError: (error: string) => void;
  correctWordlist: string[];
  setCorrectWordlist: any;
};

export default function SubmitButton({
  completeWord,
  setWord,
  setError,
  correctWordlist,
  setCorrectWordlist,
}: WordProps) {
  const [tries, setTries] = useState<number>(0);

  const getWord = async () => {
    if (completeWord === "") {
      console.log("No word entered");
    }

    if (tries >= 10) {
      console.log("You have had your max number of words for the day");
      toast.error("You have already provided 10 words, come back tomorrow!");
      return;
    }

    if (completeWord.length < 3) {
      toast.error("Words need to be 3 or more characters long.");
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

    setCorrectWordlist((prev: any) => [...prev, data[0].word]);

    // LocalStorage
    if (typeof window !== "undefined") {
      handleLocalStorage(completeWord);
    }

    setError("");
    setWord("");
    setTries((prev) => prev+1);
    toast("Word Added", {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const handleLocalStorage = (newWord: string) => {
    const oldwordList = localStorage.getItem("wordList");

    // handle first word
    if (!oldwordList) {
      localStorage.setItem("wordList", JSON.stringify([newWord]));
      return;
    }

    // If localstorageItem exists
    const currentList = JSON.parse(oldwordList);
    const newList = [newWord, ...currentList];
    localStorage.setItem("wordList", JSON.stringify(newList));
  };

  return (
    <div className="flex flex-col align-center justify-center mt-5">
      <button
        type="submit"
        onClick={getWord}
        disabled={tries >= 10}
        className="w-4/12 text-sm bg-teal-700 text-white py-2 px-6 rounded disabled:opacity-25 self-center"
      >
        Submit Word
      </button>
      <div className={`text-center mt-5 ${tries === 5 ? "text-green-500" : ""}`}>
        {`${tries}`}/10 words
      </div>
    </div>
  );
}
