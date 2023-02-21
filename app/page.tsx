import GuessContainer from "./components/GuessContainer";
import WordContainer from "./components/WordContainer";
import TopScoreContainer from "./components/TopScoreContainer";
import { generateLetters } from "./utils/letterGenerator";

export default function Home() {
  let letters: string[] = generateLetters({
    vowels: 2,
  });

  return (
    <main className="bg-gray-800 p-5 h-max">
      <h1 className="text-4xl">Word Flow</h1>
      <WordContainer letters={letters} />
      <GuessContainer letters={letters} />
      <TopScoreContainer />
    </main>
  );
}
