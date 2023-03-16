"use client";

import { LetterClick } from "@/app/types/LetterClickType";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { scores } from "../../../utils/ScoreOptions";

const loadingWords: string[] = ["L", "O", "A", "D", "I", "N", "G"];

const fetchLetters = async () => {
  const response = await axios.get("/api/highscore/getLetters");
  return response.data;
};

const checkDates = (first: Date, second: Date) =>
  !(
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );

export default function LetterCard({
  setLetterClick,
  setWord,
  submittedScore,
  setSubmittedScore
}: LetterClick) {
  // Fetch the letters of the day

  const { data, isLoading } = useQuery({
    queryFn: fetchLetters,
    queryKey: ["get-letters"],

    onSuccess: (data) => {

      

      const currentDailyLetter = JSON.parse(localStorage.getItem("dailyData")!);

      
      if (!currentDailyLetter.letters != data.letter ){
        console.log('local storage does not match letter')
        localStorage.removeItem('')
      }

      const setLettersInStorage = () => {
        const dailyData = JSON.stringify({
          letters: data.letter,
          date: new Date(),
        });
        localStorage.setItem("dailyData", dailyData);

        localStorage.removeItem("wordList");
        localStorage.removeItem("word-flow-submit");
        setSubmittedScore(false);
      };

      // If no localStorage -> Create
      if (!currentDailyLetter) {
        setLettersInStorage();
      }

      // If the dates do not match, add new letters and delete wordList
      if (
        currentDailyLetter &&
        checkDates(new Date(), new Date(currentDailyLetter.date))
      ) {
        setLettersInStorage();
      }
    },
  });

  const letterClick = (e: any) => {
    setLetterClick(e.target.dataset.letter);
  };
  const clickBackspace = () => {
    setWord((prevWord: string) => prevWord.slice(0, -1));
  };

  return (
    <>
      <div className="flex align-center justify-center text-center rounded-md">
        {!isLoading &&
          data?.letter.map((letter: string) => (
            <button
              onClick={letterClick}
              key={letter}
              data-letter={letter}
              className="relative m-1 p-2 h-15 w-12 lg:w-20 lg:h-20 rounded-lg cursor-pointer text-gray-900 text-2xl text-center bg-white active:border-slate-500 focus:outline-none focus:ring focus:ring-slate-300 ease-in-out	duration-300"
            >
              {letter}
              <span className="absolute pointer-events-none right-1px lg:right lg:top-4 text-xs lg:text-sm">
                {scores[letter.toLowerCase()]}
              </span>
            </button>
          ))}
        {!isLoading && data?.letter && (
          <button
            disabled={!submittedScore}
            className="m-2 p-2 h-15 w-12 lg:w-15 lg:h-15 rounded-lg cursor-pointer text-gray-900 text-center  active:border-slate-500 focus:outline-none focus:ring focus:ring-slate-300 ease-in-out duration-300"
            aria-label="backspace"
          >
            <FontAwesomeIcon
              onClick={clickBackspace}
              className="text-center text-white text-3xl lg:text-4xl"
              icon={faDeleteLeft}
            />
          </button>
        )}
        {isLoading &&
          loadingWords?.map((letter: string) => (
            <div
              key={letter}
              className="flex align-center justify-center align-middle m-1 p-2 h-15 w-12 lg:w-20 lg:h-20 rounded-lg cursor-pointer text-gray-900 text-2xl text-center active:border-slate-500 focus:outline-none bg-slate-300"
            >
             <p className="text-center align-middle">{letter}</p> 
            </div>
          ))}
      </div>
    </>
  );
}
