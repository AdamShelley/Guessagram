"use client";

import { useEffect, useState } from "react";
import GuessContainer from "./GuessContainer/GuessContainer";
import SubmitButton from "./GuessContainer/SubmitButton";
import WordContainer from "./TodaysLetters/WordContainer";
import ScoreContainer from "./UserSubmit/ScoreContainer";

export default function () {
  const [dailyLetters, setDailyLetters] = useState<string[]>([]);
  const [correctWordlist, setCorrectWordlist] = useState<string[]>([]);
  const [submittedScore, setSubmittedScore] = useState(false);
  const [letterClicked, setLetterClick] = useState<string>("");
  const [todaysAttempts, setTodaysAttempts] = useState(0);
  const [word, setWord] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const wordsAlreadySubmitted = JSON.parse(localStorage.getItem("wordList")!);
    if (wordsAlreadySubmitted) {
      setCorrectWordlist(wordsAlreadySubmitted);
    }

    const submittedScoreStatus = JSON.parse(
      localStorage.getItem("word-flow-submit")!
    );

    if (submittedScoreStatus && submittedScoreStatus.submitted) {
      setSubmittedScore(true);
    }

    const todaysLetters = JSON.parse(localStorage.getItem('dailyData')!)

    if (todaysLetters) {
      setDailyLetters(todaysLetters.letters)
    }

  }, []);

  return (
    <div className="flex flex-col lg:w-1/2 place-self-center ">
      <GuessContainer
        setLetterClick={setLetterClick}
        letterClicked={letterClicked}
        word={word}
        setWord={setWord}
        submittedScore={submittedScore}
      />

      <WordContainer
        setLetterClick={setLetterClick}
        setWord={setWord}
        submittedScore={submittedScore}
      />

      {error && (
        <div className="mt-3 bg-slate-800 text-center">
          {error && <p className="text-red-400">{error}</p>}
        </div>
      )}

      {!submittedScore && (
        <SubmitButton
          setCorrectWordlist={setCorrectWordlist}
          correctWordlist={correctWordlist}
          completeWord={word}
          setWord={setWord}
          setError={setError}
          setTodaysAttempts={setTodaysAttempts}
        />
      )}

      {correctWordlist.length >= 1  &&  (
        <ScoreContainer
          correctWordlist={correctWordlist}
          submittedScore={submittedScore}
          setSubmittedScore={setSubmittedScore}
          dailyLetters={dailyLetters}
          todaysAttempts={todaysAttempts}
        />
      )}
    </div>
  );
}
