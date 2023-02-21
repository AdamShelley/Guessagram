"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Rules from "./Rules";
import GuessContainer from "./GuessContainer";

const fetchLetters = async () => {
  const response = await axios.get("/api/highscore/getLetters");
  return response.data;
};

export default function LetterCard() {
  // Fetch the letters of the day
  const [toggle, setToggle] = useState(false);
  const [letterClicked, setLetterClick] = useState("");
  const { data, isLoading } = useQuery({
    queryFn: fetchLetters,
    queryKey: ["get-letters"],
  });

  if (isLoading) return <p>...is loading</p>;

  const letterClick = (e: any) => {
    console.log("Click event");

    console.log(e.target.dataset.letter);
    setLetterClick(e.target.dataset.letter);
  };

  return (
    <>
      <div className=" flex align-center justify-center rounded-md">
        <span
          onClick={(e) => setToggle(true)}
          className="border-solid border-white-100 border-2 rounded-lg p-2 m-auto"
        >
          i
        </span>
        {data?.letter.map((letter: string) => (
          <p
            onClick={letterClick}
            data-letter={letter}
            className="w-10 m-2 p-3 text-gray-900 text-2xl text-center bg-white"
          >
            {letter}
          </p>
        ))}
      </div>
      <GuessContainer
        letterClicked={letterClicked}
        setLetterClick={setLetterClick}
      />
      {toggle && <Rules setToggle={setToggle} />}
    </>
  );
}
