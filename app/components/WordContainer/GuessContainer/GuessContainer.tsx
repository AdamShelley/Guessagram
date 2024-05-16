import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import GuessCard from "./GuessCard";

type GuessProps = {
  letterClicked: string;
  setLetterClick: (letter: string) => void;
  word: string;
  setWord: (letter: any) => void;
  submittedScore: boolean;
};

const fetchLetters = async () => {
  const response = await axios.get("/api/highscore/getLetters");
  return response.data;
};

export default function GuessContainer({
  letterClicked,
  setLetterClick,
  word,
  setWord,
  submittedScore,
}: GuessProps) {
  const { data } = useQuery({
    queryFn: fetchLetters,
    queryKey: ["get-letters"],
  });

  useEffect(() => {
    if (word.length < 6) {
      setWord((prev: string) => prev + letterClicked);
      setLetterClick("");
    }
  }, [letterClicked]);

  return (
    <>
      {!submittedScore && (
        <div className="mt-10 flex flex-col ">
          <div className="flex justify-center align-center py-2 mt-5">
            {data && (
              <div className="flex flex-col">
                <div
                  className={`flex align-center justify-center ${
                    word.length === 0 && "mb-7"
                  }`}
                >
                  <GuessCard
                    letters={data?.letter}
                    word={word}
                    setWord={setWord}
                  />
                </div>

                {word.length > 0 && (
                  <p className={`self-center text-sm mt-2`}>{word.length}/6</p>
                )}
              </div>
            )}
            {/* Skeleton */}
            {!data && (
              <div className="mt-10 flex flex-col">
                <div className="flex align-center justify-center py-2 mt-5 mb-2">
                  <div className="flex flex-col align-center justify-center text-center">
                    <div className="mb-7 h-15 border-b border-slate-600 bg-transparent text-slate-900 text-5xl w-9/12 h-full text-center"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
