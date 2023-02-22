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
      <div className="bg-white rounded-sm h-10">
        <input
          maxLength={6}
          className="text-gray-900 w-full h-full text-center"
          type="text"
          value={word}
          onChange={handleInput}
          autoComplete="false"
        />
      </div>
    </div>
  );
}
