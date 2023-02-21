"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { checkLocalStorage } from "../utils/checkLocalStorage";
import GuessCard from "./GuessCard";
import SubmitButton from "./SubmitButton";
import SubmitSuccess from "./SubmitSuccess";

type LetterProp = {
  letterClicked: string;
  setLetterClick: (letter: string) => void;
};

const fetchLetters = async () => {
  const response = await axios.get("/api/highscore/getLetters");
  return response.data;
};

export default function GuessContainer({
  letterClicked,
  setLetterClick,
}: LetterProp) {
  const [word, setWord] = useState("");

  let successSubmittedResult = false;

  useEffect(() => {
    if (typeof window !== "undefined") {
      successSubmittedResult = checkLocalStorage();
    }
  }, []);

  if (successSubmittedResult) return <SubmitSuccess />;

  const { data } = useQuery({
    queryFn: fetchLetters,
    queryKey: ["get-letters"],
  });

  const clickBackspace = () => {
    console.log("Backspace clicked");
    setWord((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    setWord((prev) => prev + letterClicked);
    setLetterClick("");
  }, [letterClicked]);

  return (
    <>
      {!successSubmittedResult && (
        <div className="flex flex-col">
          <div className="flex justify-center align-center py-2 mt-5">
            {data && (
              <>
                <GuessCard
                  letters={data?.letter}
                  word={word}
                  setWord={setWord}
                />
                <div
                  className="text-2xl align-center my-auto bg-slate-700  h-10 w-10 border-solid border-2"
                  onClick={clickBackspace}
                >
                  {"<-"}
                </div>
              </>
            )}
          </div>
          <SubmitButton completeWord={word} setWord={setWord} />
        </div>
      )}
    </>
  );
}
