"use client";

import { ChangeEvent, useState } from "react";

interface LetterProps {
  letters: string[];
  setWord: any;
}

export default function GuessCard({ letters, setWord }: LetterProps) {
  const [letter, setLetter] = useState<string>("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    // Check the letter is in the letter string

    const latestLetter = e.target.value.charAt(e.target.value.length - 1);

    if (latestLetter === "") {
      setLetter("");
    }

    if (letters.includes(latestLetter.toUpperCase())) {
      setLetter(e.target.value);
      setWord(e.target.value);
    }
  };

  return (
    <div className="bg-white rounded m-1 h-10 flex justify-center">
      <input
        maxLength={6}
        className="text-gray-900 m-1 text-center"
        type="text"
        value={letter}
        onChange={handleInput}
      />
    </div>
  );
}
