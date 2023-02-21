import LetterCard from "./LetterCard";

interface LetterProps {
  letters: string[];
}

export default function WordContainer({ letters }: LetterProps) {
  return (
    <div className="mt-10 text-center">
      <h2>Todays letters</h2>

      <div className="m-2 p-2 flex justify-center align-center">
        {letters.map((letter) => (
          <LetterCard key={letter} letter={letter} />
        ))}
      </div>
    </div>
  );
}
