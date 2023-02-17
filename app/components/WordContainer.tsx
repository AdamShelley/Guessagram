import LetterCard from "./LetterCard";

interface LetterProps {
  letters: string[];
}

export default function WordContainer({ letters }: LetterProps) {
  return (
    <div className="p-5">
      <h2>Todays letters: </h2>

      <div className="flex justify-center align-center">
        {letters.map((letter) => (
          <LetterCard key={letter} letter={letter} />
        ))}
      </div>
    </div>
  );
}
