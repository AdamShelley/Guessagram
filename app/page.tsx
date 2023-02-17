import GuessContainer from "./components/GuessContainer";
import WordContainer from "./components/WordContainer";
import TopScoreContainer from "./components/TopScoreContainer";
import { generateLetters } from "./utils/letterGenerator";

export default function Home() {
  const letters = generateLetters({
    vowels: 2,
  });

  return (
    <main className="bg-gray-800 p-5">
      <h1 className="text-2xl">Word Flow</h1>
      <WordContainer letters={letters} />
      <GuessContainer letters={letters} />
      <TopScoreContainer />
    </main>
  );
}
