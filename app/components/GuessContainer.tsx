"use client";

import { useState } from "react";
import { checkLocalStorage } from "../utils/checkLocalStorage";
import GuessCard from "./GuessCard";
import SubmitButton from "./SubmitButton";
import SubmitSuccess from "./SubmitSuccess";

interface LetterProps {
  letters: string[];
}

export default function GuessContainer({ letters }: LetterProps) {
  const [word, setWord] = useState("");

  let successfulSubmittedResult;
  if (typeof window !== undefined) {
    successfulSubmittedResult = checkLocalStorage();
  }

  if (successfulSubmittedResult?.submitted) return <SubmitSuccess />;

  return (
    <div className="flex flex-col">
      <div className="flex justify-center align-center py-2 mt-5">
        <GuessCard letters={letters} word={word} setWord={setWord} />
      </div>
      <SubmitButton completeWord={word} setWord={setWord} />
    </div>
  );
}
