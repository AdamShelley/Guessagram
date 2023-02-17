import GuessContainer from "./components/GuessContainer";
import WordContainer from "./components/WordContainer";
import { generateLetters } from "./utils/letterGenerator";

export default function Home() {
  const letters = generateLetters({
    vowels: 2,
  });

  return (
    <main className="bg-gray-400 ">
      <h1 className="p-4 text-2xl">Word Flow</h1>
      <WordContainer letters={letters} />
      <GuessContainer letters={letters} />
    </main>
  );
}
