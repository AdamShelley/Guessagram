"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import LetterCard from "./LetterCard";

const fetchLetters = async () => {
  const response = await axios.get("/api/highscore/getLetters");
  return response.data;
};

export default function WordContainer() {
  // TEMP - USE CRON TO CALL?
  // const { mutate } = useMutation(
  //   async () => await axios.post("/api/highscore/generateLetters"),
  //   {
  //     onError: (error) => {
  //       console.log(error);
  //     },
  //     onSuccess: (data) => {
  //       console.log(data);
  //     },
  //   }
  // );

  // useEffect(() => {
  //   mutate();
  // }, []);
  // END OF TEMP

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
