"use client";

import { useState } from "react";
import GuessCard from "./GuessCard";
import SubmitButton from "./SubmitButton";

interface LetterProps {
  letters: string[];
}

export default function GuessContainer({ letters }: LetterProps) {
  const [word, setWord] = useState("");

  return (
    <div className="flex flex-col">
      <h2>Guess Container</h2>
      <div className="flex justify-center align-center py-5">
        <GuessCard letters={letters} setWord={setWord} />
      </div>
      <SubmitButton completeWord={word} />
    </div>
  );
}
