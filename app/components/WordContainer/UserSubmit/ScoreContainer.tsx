"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import ShareScore from "../../CompletedDay/ShareScore";
import { scores } from "@/app/utils/ScoreOptions";
import Definition from "./Definition";

type CorrectWordProp = {
  correctWordlist: string[];
  submittedScore: boolean;
  setSubmittedScore: (submitted: boolean) => void;
  todaysAttempts: number;
  definitions: {
    word: string;
    definition: string;
  }[];
  setDefinitions: (def: []) => void;
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
  todaysAttempts,
  definitions,
  setDefinitions
}: CorrectWordProp) {
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);
  const [modalDefinition, setModalDefinition] = useState<string>('')
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
    let wordScore: number = 0;
    const upperCase = word.toUpperCase();
    let wordSplit = upperCase.split("");

    wordSplit.forEach((letter: string) => {
      const num: number = scores[letter.toLowerCase()];
      wordScore += num;
    });

    // Test if all letters are used
    if (wordSplit.length === 6) {
      const letters = JSON.parse(localStorage.getItem("dailyData")!).letters;
      wordSplit.sort();
      letters.sort();
      if (JSON.stringify(letters) == JSON.stringify(wordSplit)) wordScore += 20;
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

    // Handle the localstorage for stats
    const storedStats = JSON.parse(localStorage.getItem("personal-stats")!);

    if (!storedStats) {
      localStorage.setItem(
        "personal-stats",
        JSON.stringify({
          daysPlayed: 1,
          totalWords: correctWordlist.length,
          totalScore: score,
          totalGuessAttempts: todaysAttempts,
        })
      );
    } else {
      localStorage.setItem(
        "personal-stats",
        JSON.stringify({
          daysPlayed: storedStats.daysPlayed + 1,
          totalWords: storedStats.totalWords + correctWordlist.length,
          totalScore: storedStats.totalScore + score,
          totalGuessAttempts: storedStats.totalGuessAttempts + todaysAttempts,
        })
      );
    }

    toast.success("Your Score has been submitted - did you make the top 10?", {
      duration: 5000,
    });

    setSubmittedScore(true);
  };

  const showDefinitionHandler = (word: string) => {
    const correctDefinition = definitions.filter(w => w.word === word);
    if (!correctDefinition) return;
    setModalDefinition(correctDefinition[0].definition)    
  };

  useEffect(() => {
    wordListWithScore = generateWordListWithScore();
    setScore(totalScore);
  }, [correctWordlist]);

  // Check definitions
  useEffect(() => {
    
    if (definitions.length === 0 && correctWordlist.length !== 0) {
      // console.log("We have words but no definitions!");
      const defFromLocalStorage = JSON.parse(localStorage.getItem('definitions')!);
      if (!defFromLocalStorage) return;

      setDefinitions(defFromLocalStorage)
    }
  }, []);

  // console.log(definitions);

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
              <p
                className="text-gray-100 text-md cursor-pointer"
                onClick={() => showDefinitionHandler(word.word)}
              >
                {word.word.toUpperCase()}
              </p>

              <p className="text-md">{word.score} points</p>
              
            </li>
          ))}
          {modalDefinition && <Definition def={modalDefinition}/>}
          
      </ul>
      {submittedScore && (
        <>
          <p>Share your score: </p>
          <ShareScore
            totalScore={totalScore}
            correctWordlist={correctWordlist}
          />
        </>
      )}
      {wordListWithScore.length >= 1 && !submittedScore && (
        <div className="border-dashed border-t-2 border-slate-700">
          {/* [<h3 className="text-xl mt-10 m-auto align-center text-center">
            Submit your daily result
          </h3>] */}
          <form
            onSubmit={submitScore}
            className="flex flex-col align-center justify-center "
          >
            <label htmlFor="name" className="mt-5 text-md m-auto">
              Submit your result
            </label>
            <input
              className="text-gray-900 p-2 my-2 mt-3 rounded-sm bg-slate-200 w-1/2 align-center m-auto lg:w-1/4"
              type="text"
              name="name"
              placeholder="Add your name"
              onChange={(e) => setUserName(e.target.value)}
            />

            <button
              id="submit"
              className="mt-3 text-sm bg-teal-900 text-white py-2 px-6 rounded-sm disabled:opacity-25 self-center lg:w-1/4"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
