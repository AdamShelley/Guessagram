"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

type CorrectWordProp = {
  correctWordlist: string[];
  submittedScore: boolean;
  setSubmittedScore: (submitted: boolean) => void;
  dailyLetters: string[];
};

type ScoreOptions = {
  [key: string]: number;
};

type FormData = {
  userName: string;
  score: number;
  highestScoreWord: {
    word: string;
    score: number;
  };
};

export default function ScoreContainer({
  correctWordlist,
  submittedScore,
  setSubmittedScore,
  dailyLetters,
}: CorrectWordProp) {
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (data: FormData) =>
      await axios.post("/api/highscore/postScore", { data }),
    {
      onError: (error) => {
        console.log(error);
        if (error instanceof AxiosError) {
          console.log(error);
        }
      },
      onSuccess: (_) => {
        queryClient.invalidateQueries(["get-scores"]);
      },
    }
  );

  // Calculate the individual word score
  const calculateScore = (word: string) => {
    const scores: ScoreOptions = {
      a: 1,
      b: 3,
      c: 3,
      d: 2,
      e: 1,
      f: 4,
      g: 2,
      h: 4,
      i: 1,
      j: 8,
      k: 5,
      l: 1,
      m: 3,
      n: 1,
      o: 1,
      p: 3,
      q: 10,
      r: 1,
      s: 1,
      t: 1,
      u: 1,
      v: 4,
      w: 2,
      x: 8,
      y: 4,
      z: 10,
    };

    let wordScore: number = 0;

    word.split("").forEach((letter: string) => {
      const num: number = scores[letter.toLowerCase()];
      wordScore += num;
    });

    // Did user use all letters - needs testing
    if (word.split('').length === 6 ) {
      word.split('').every((element) => {
        if (!dailyLetters.includes(element)) {
          return;
        }
      })

      wordScore += 20
    }

    

    return wordScore;
  };

  const generateWordListWithScore = () => {
    return correctWordlist.map((word) => {
      return {
        word,
        score: calculateScore(word),
      };
    });
  };

  // Organise word list
  let wordListWithScore = generateWordListWithScore();

  // Calculate total score
  const totalScore = wordListWithScore?.reduce((acc, obj) => {
    return acc + obj.score;
  }, 0);

  // Submit Score to Top Score database
  const submitScore = (e: React.FormEvent) => {
    e.preventDefault();

    if (submittedScore)
      return toast.error(
        "You have already submitted today, come back tomorrow!"
      );

    if (!userName) return;

    const amounts = wordListWithScore.map((a) => a.score);
    const highestScore = Math.max(...amounts);
    const highestScoreWord = wordListWithScore.filter(
      (word) => word.score === highestScore
    )[0];

    mutate({ userName, score, highestScoreWord });

    // Add localstorage to only show scores
    localStorage.setItem(
      "word-flow-submit",
      JSON.stringify({ submitted: true, userName })
    );

    toast.success("Your Score has been submitted - did you make the top 10?", {
      duration: 5000,
    });

    setSubmittedScore(true);
  };

  useEffect(() => {
    wordListWithScore = generateWordListWithScore();
    setScore(totalScore);
  }, [correctWordlist]);

  

  return (
    <div className="mt-10 bg-slate-800 border border-slate-700 rounded-lg  shadow-lg p-5">
      <h3 className="text-xl">Your Words</h3>
      <h4 className="mt-1">Score: {score}</h4>
      <ul className="mt-5 mb-5">
        {correctWordlist &&
          wordListWithScore?.map((word, index) => (
            <li
              className="text-md m-2 p-2 grid gap-5 grid-cols-3 justify-center align-center text-center"
              key={word.word}
            >
              <p>{index + 1}</p>
              <p className="text-gray-100 text-md">{word.word.toUpperCase()}</p>
              <p className="text-md">{word.score} points</p>
            </li>
          ))}
      </ul>
      {wordListWithScore.length >= 1 && !submittedScore && (
        <div className="border-dashed border-t-2 border-slate-700">
          <h3 className="text-xl mt-10 m-auto align-center text-center">
            Submit your daily result
          </h3>
          <form
            onSubmit={submitScore}
            className="flex flex-col align-center justify-center "
          >
            <label htmlFor="name" className="mt-5 text-sm m-auto">
              Add your nickname
            </label>
            <input
              className="text-gray-900 p-2 my-2 mt-3 rounded-md bg-slate-300 w-9/12 align-center m-auto"
              type="text"
              name="name"
              onChange={(e) => setUserName(e.target.value)}
            />

            <button
              id="submit"
              className="mt-3 text-sm bg-teal-900 text-white py-2 px-6 rounded disabled:opacity-25 self-center"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
