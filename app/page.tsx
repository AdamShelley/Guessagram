import GuessContainer from "./components/GuessContainer";
import WordContainer from "./components/WordContainer";
import TopScoreContainer from "./components/TopScoreContainer";

export default function Home() {
  return (
    <main className="bg-gray-800 p-5 h-max">
      <h1 className="text-4xl">Word Flow</h1>
      <WordContainer />
      <GuessContainer />
      <TopScoreContainer />
    </main>
  );
}
