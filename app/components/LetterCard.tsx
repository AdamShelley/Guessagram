interface LetterProps {
  letter: string;
}

export default function LetterCard({ letter }: LetterProps) {
  return (
    <div className="m-2 mt-10 px-20 py-10 bg-white rounded">
      <p className="text-gray-900 text-2xl">{letter}</p>
    </div>
  );
}
