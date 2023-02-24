"use client";

import { LetterClick } from "@/app/types/LetterClickType";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const loadingWords: string[] = ["L", "O", "A", "D", "I", "N", "G"];

const fetchLetters = async () => {
  const response = await axios.get("/api/highscore/getLetters");
  return response.data;
};

const checkDates = (first: Date, second: Date) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();


export default function LetterCard({ setLetterClick, setWord }: LetterClick) {
  // Fetch the letters of the day

  const { data, isLoading } = useQuery({
    queryFn: fetchLetters,
    queryKey: ["get-letters"],
    onSuccess: (data) => {
      const currentDailyLetter = JSON.parse(localStorage.getItem("dailyData")!);

      const setLettersInStorage = () => {
        console.log('Resetting daily words')
        const dailyData = JSON.stringify({
          letters: data.letter,
          date: new Date(),
        });
        localStorage.setItem("dailyData", dailyData);

        localStorage.removeItem("wordList");
        localStorage.removeItem('word-flow-submit')
      };

      // If no localStorage -> Create
      if (!currentDailyLetter) {
        setLettersInStorage();
      }

      // If the dates do not match, add new letters and delete wordList
      if (checkDates(new Date(), new Date(currentDailyLetter.date))) {
        console.log("dates dont match");
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
      <div className=" flex align-center justify-center rounded-md">
        {!isLoading &&
          data?.letter.map((letter: string) => (
            <button
              onClick={letterClick}
              key={letter}
              data-letter={letter}
              className="cursor-pointer w-10 h-15 m-2 p-3 text-gray-900 text-2xl text-center bg-white active:border-slate-500 focus:outline-none focus:ring focus:ring-slate-300 ease-in-out	duration-300"
            >
              {letter}
            </button>
          ))}
        {!isLoading && data?.letter && (
          <FontAwesomeIcon
            onClick={clickBackspace}
            className="cursor-pointer w-5 h-10 m-2 p-3 text-gray-900 text-2xl text-center bg-white active:border-slate-500 focus:outline-none focus:ring focus:ring-slate-300 ease-in-out	duration-300"
            icon={faDeleteLeft}
          />
        )}
        {isLoading &&
          loadingWords?.map((letter: string) => (
            <div
              key={letter}
              className="cursor-pointer h-15 w-10 m-2 p-3 text-gray-900 text-2xl text-center bg-slate-300 active:border-slate-500 focus:outline-none focus:ring focus:ring-slate-300 ease-in-out	duration-300"
            >
              {letter}
            </div>
          ))}
      </div>

      {/* {toggle && <Rules setToggle={setToggle} />} */}
    </>
  );
}
