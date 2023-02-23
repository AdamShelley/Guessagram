"use client";

import { useEffect, useState } from "react";
import GuessContainer from "./GuessContainer/GuessContainer";
import SubmitButton from "./GuessContainer/SubmitButton";
import WordContainer from "./TodaysLetters/WordContainer";
import ScoreContainer from "./UserSubmit/ScoreContainer";

export default function () {
  const [correctWordlist, setCorrectWordlist] = useState<string[]>([]);
  const [letterClicked, setLetterClick] = useState<string>("");
  const [word, setWord] = useState<string>("");
  const [error, setError] = useState<string>("");


  useEffect(()=>{
    const wordsAlreadySubmitted = JSON.parse(localStorage.getItem('wordList')!);
    if (wordsAlreadySubmitted){
      setCorrectWordlist(wordsAlreadySubmitted);
    }
  },[])

  return (
    <div className="flex flex-col">
      <WordContainer setLetterClick={setLetterClick} setWord={setWord} />
      <GuessContainer
        setLetterClick={setLetterClick}
        letterClicked={letterClicked}
        word={word}
        setWord={setWord}
        error={error}
      />
      <SubmitButton
        setCorrectWordlist={setCorrectWordlist}
        correctWordlist={correctWordlist}
        completeWord={word}
        setWord={setWord}
        setError={setError}
      />
      <ScoreContainer correctWordlist={correctWordlist} />
    </div>
  );
}
