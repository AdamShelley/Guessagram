"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { checkLocalStorage } from "../utils/checkLocalStorage";
import GuessCard from "./GuessCard";
import SubmitButton from "./SubmitButton";
import SubmitSuccess from "./SubmitSuccess";

const fetchLetters = async () => {
  const response = await axios.get("/api/highscore/getLetters");
  return response.data;
};

export default function GuessContainer() {
  const [word, setWord] = useState("");

  let successSubmittedResult = false;

  useEffect(() => {
    if (typeof window !== "undefined") {
      successSubmittedResult = checkLocalStorage();
    }
  }, []);

  if (successSubmittedResult) return <SubmitSuccess />;

  const { data, isLoading } = useQuery({
    queryFn: fetchLetters,
    queryKey: ["get-letters"],
  });

  if (isLoading) return <p>loading..</p>;

  return (
    <>
      {!successSubmittedResult && (
        <div className="flex flex-col">
          <div className="flex justify-center align-center py-2 mt-5">
            <GuessCard letters={data?.letters} word={word} setWord={setWord} />
          </div>
          <SubmitButton completeWord={word} setWord={setWord} />
        </div>
      )}
    </>
  );
}
