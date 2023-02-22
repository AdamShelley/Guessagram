"use client";

import { useState } from "react";
import GuessContainer from "./GuessContainer/GuessContainer";
import SubmitButton from "./GuessContainer/SubmitButton";
import WordContainer from "./TodaysLetters/WordContainer";

export default function () {
  const [letterClicked, setLetterClick] = useState<string>("");
  const [word, setWord] = useState<string>("");
  const [error, setError] = useState<string>("");
  

  return (
    <div className="flex flex-col">
      <WordContainer setLetterClick={setLetterClick} setWord={setWord}/>
      <GuessContainer
        setLetterClick={setLetterClick}
        letterClicked={letterClicked}
        word={word}
        setWord={setWord}
        error={error}
      />
      <SubmitButton completeWord={word} setWord={setWord} setError={setError} />
    </div>
  );
}
