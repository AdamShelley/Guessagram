"use client";

import { useEffect, useState } from "react";
import GuessContainer from "./GuessContainer/GuessContainer";
import SubmitButton from "./GuessContainer/SubmitButton";
import WordContainer from "./TodaysLetters/WordContainer";
import ScoreContainer from "./UserSubmit/ScoreContainer";

export default function () {
  const [correctWordlist, setCorrectWordlist] = useState<string[]>([]);
  const [submittedScore, setSubmittedScore] = useState(false);
  const [letterClicked, setLetterClick] = useState<string>("");
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
  }, []);

  return (
    <div className="flex flex-col">
      <WordContainer setLetterClick={setLetterClick} setWord={setWord} submittedScore={submittedScore} />
      <GuessContainer
        setLetterClick={setLetterClick}
        letterClicked={letterClicked}
        word={word}
        setWord={setWord}
        error={error}
        submittedScore={submittedScore}
      />
      {!submittedScore && (
        <SubmitButton
          setCorrectWordlist={setCorrectWordlist}
          correctWordlist={correctWordlist}
          completeWord={word}
          setWord={setWord}
          setError={setError}
        />
      )}
      {correctWordlist.length >= 1 && (
        <ScoreContainer
          correctWordlist={correctWordlist}
          submittedScore={submittedScore}
          setSubmittedScore={setSubmittedScore}
        />
      )}
    </div>
  );
}
