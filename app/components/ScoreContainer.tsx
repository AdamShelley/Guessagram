"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

type CorrectWordProp = {
  correctWordlist: string[];
};

type ScoreOptions = {
  [key: string]: number;
};

type FormData = {
  userName: string;
  score: number;
};

export default function ScoreContainer({ correctWordlist }: CorrectWordProp) {
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
        }
      },
      onSuccess: (data) => {
        console.log(data);
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
      const num: number = scores[letter];
      wordScore += num;
    });

    return wordScore;
  };

  // Organise word list
  const wordListWithScore = correctWordlist.map((word) => {
    return {
      word,
      score: calculateScore(word),
    };
  });

  // Calculate total score
  const totalScore = wordListWithScore.reduce((acc, obj) => {
    return acc + obj.score;
  }, 0);

  // Submit Score to Top Score database
  const submitScore = (e: React.FormEvent) => {
    console.log("submitting");
    e.preventDefault();
    mutate({ userName, score });

    // Add localstorage to only show scores
    localStorage.setItem(
      "word-flow-submit",
      JSON.stringify({ submitted: true })
    );

    toast.success("Your Score has been submitted - did you make the top 10?", {
      duration: 5000,
    });
  };

  useEffect(() => {
    setScore(totalScore);
  }, [correctWordlist]);

  return (
    <div className="mt-20">
      <h3 className="text-2xl">Score Container</h3>
      <h4 className="mt-3">Your Score: {score}</h4>
      <ul className="m-5">
        {wordListWithScore?.map((word) => (
          <li
            className="m-2 p-2 grid gap-2 grid-cols-2 justify-center align-center text-center"
            key={word.word}
          >
            <p className="text-gray-100 text-2xl">{word.word}</p>
            <p className="m-2">{word.score} points</p>
          </li>
        ))}
      </ul>
      <h3 className="text-2xl">Submit result</h3>
      <form onSubmit={submitScore} className="flex flex-col">
        <label htmlFor="name" className="mt-5">
          Add a name
        </label>
        <input
          className="text-gray-900 p-2 my-2"
          type="text"
          name="name"
          onChange={(e) => setUserName(e.target.value)}
        />
        <p className="mt-1">Score: {score}</p>
        <button
          id="submit"
          className="text-sm bg-teal-900 text-white py-2 px-6 rounded disabled:opacity-25 self-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
