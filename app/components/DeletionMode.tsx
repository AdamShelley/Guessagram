"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function DeletionMode() {
  const { mutate } = useMutation(
    async () => await axios.delete("/api/highscore/deleteScores"),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  const deletePost = () => {
    mutate();
  };

  return <div onClick={deletePost}>Delete all</div>;
}
