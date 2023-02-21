"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import LetterCard from "./LetterCard";

const fetchLetters = async () => {
  const response = await axios.get("/api/highscore/getLetters");
  return response.data;
};

export default function WordContainer() {
  // Fetch the letters of the day
  const { data, isLoading } = useQuery({
    queryFn: fetchLetters,
    queryKey: ["get-letters"],
  });

  if (isLoading) return <p>loading..</p>;

  return (
    <div className="mt-10 text-center">
      <h2>Todays letters</h2>
      <div className="m-2 p-2 flex justify-center align-center">
        {data?.letter.map((letter: string) => (
          <LetterCard key={letter} letter={letter} />
        ))}
      </div>
    </div>
  );
}
