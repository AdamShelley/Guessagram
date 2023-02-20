interface LetterProps {
  letter: string;
}

export default function LetterCard({ letter }: LetterProps) {
  return (
    <div className="w-6/12 p-4 m-1 lg:mt-10 lg:px-20 lg:py-10 bg-white rounded">
      <p className="text-gray-900 text-2xl align-center">{letter}</p>
    </div>
  );
}
