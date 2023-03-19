"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type WordProps = {
  completeWord: string;
  setWord: (word: string) => void;
  setError: (error: string) => void;
  correctWordlist: string[];
  setCorrectWordlist: (prev: any) => void; 
  setTodaysAttempts: (update: (attempts: number) => number) => void;
  setDefinitions: (prev: any) => void;
};

export default function SubmitButton({
  completeWord,
  setWord,
  setError,
  correctWordlist,
  setCorrectWordlist,
  setTodaysAttempts,
  setDefinitions
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

    console.log(correctWordlist);

    if (correctWordlist.includes(completeWord)) {
      return setError("Already added that word!");
    }

    setTodaysAttempts((attempts: number) => attempts + 1);

    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${completeWord}`
    );

    const data = await res.json();
    const word = data[0].word;
    const definition = data[0].meanings[0].definitions[0].definition;


    console.log(data[0].meanings[0].definitions[0].definition);

    if (data.title === "No Definitions Found") {
      return setError("Not a real word");
    }

    if (correctWordlist.includes(word)) {
      return setError("Already added that word!");
    }

    setCorrectWordlist((prev: any) => [...prev, word]);
    setDefinitions((prev:any) => [...prev, {word, definition}])

    // LocalStorage
    if (typeof window !== "undefined") {
      handleLocalStorage(completeWord, definition);
    }

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

  // const handleLocalStorage = (newWord: string, definition: string) => {
  //   const oldwordList = localStorage.getItem("wordList")!;
  //   const oldDefList = localStorage.getItem("definitions")!;

  //   console.log(oldDefList)

  //   // handle first word
  //   if (!oldwordList) {
  //     console.log('setting initial word localstorage')
  //     localStorage.setItem("wordList", JSON.stringify([newWord]));
  //     localStorage.setItem("definitions", JSON.stringify([{newWord, definition}]));
  //     return;
  //   }

  //   // If localstorageItem exists
  //   const currentList = JSON.parse(oldwordList);
  //   const newList = [newWord, ...currentList];
  //   localStorage.setItem("wordList", JSON.stringify(newList));

  //   const currentDef = JSON.parse(oldDefList);
  //   const newDefList = [{newWord, definition}, ...currentDef]
  //   localStorage.setItem('definitions', JSON.stringify(newDefList))
  // };

  const handleLocalStorage = (newWord: string, definition: string) => {
    const oldWordList = localStorage.getItem("wordList") || "[]";
    const oldDefList = localStorage.getItem("definitions") || "[]";
  
    const currentList = JSON.parse(oldWordList);
    const currentDefList = JSON.parse(oldDefList);
  
    // Check if the new word already exists in the list
    const wordIndex = currentList.findIndex((word: any) => word.word === newWord);
    if (wordIndex >= 0) {
      return setError("Already added that word!");
    }
  
    // Add the new word and definition to the list
    const newList = [newWord , ...currentList];
    const newDefList = [{ word: newWord, definition }, ...currentDefList];
  
    // Store the updated lists in localStorage
    localStorage.setItem("wordList", JSON.stringify(newList));
    localStorage.setItem("definitions", JSON.stringify(newDefList));
  };

  // Add this list to tries, do not allow same words to be submitted
  useEffect(() => {
    setTries(correctWordlist.length);
    // Set complete word list here?
  }, [correctWordlist]);

  return (
    <div className="flex flex-col align-center justify-center mt-5">
      <button
        type="submit"
        onClick={getWord}
        disabled={tries >= 10 || completeWord.length < 3}
        className="w-8/12 text-sm bg-teal-700 text-white py-2 px-5 rounded disabled:opacity-25 self-center lg:w-1/2"
      >
        Submit Word
      </button>
      <div className={`text-center mt-5 ${tries >= 5 ? "text-green-500" : ""}`}>
        {`${tries}`}/10 words
      </div>
    </div>
  );
}
