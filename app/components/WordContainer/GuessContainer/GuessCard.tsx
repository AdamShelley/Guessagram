import { ChangeEvent } from "react";

type LetterProps = {
  letters: string[];
  word: string;
  setWord: (newWord: string) => void;
};

export default function GuessCard({ letters, word, setWord }: LetterProps) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    // Check the letter is in the letter string
    const latestLetter = e.target.value.charAt(e.target.value.length - 1);

    if (latestLetter === "") {
      setWord("");
    }

    if (letters.includes(latestLetter.toUpperCase())) {
      setWord(e.target.value);
    }
  };

  return (
    <div className="flex flex-col align-center justify-center text-center">
      <div className="h-20">
        <input
          maxLength={6}
          className="border-b-2 border-slate-500 bg-transparent text-slate-100 text-5xl w-9/12 h-full text-center"
          type="text"
          value={word}
          onChange={handleInput}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
