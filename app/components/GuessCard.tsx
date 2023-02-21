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
    <div className="bg-white rounded-sm m-1 h-10 w-6/12 flex justify-center">
      <input
        maxLength={6}
        className="text-gray-900 w-full text-center"
        type="text"
        value={word}
        onChange={handleInput}
        autoComplete="false"
      />
    </div>
  );
}
