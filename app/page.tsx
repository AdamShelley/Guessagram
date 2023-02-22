import TopScoreContainer from "./components/HighscoreContainer/TopScoreContainer";
import Navbuttons from "./components/nav/NavButtons";
import WordFlowContainer from "./components/WordContainer/WordFlowContainer";

export default function Home() {
  return (
    <main className="bg-gray-800 p-5 h-max">
      <nav className="flex justify-between align-center ">
        <div>
          <h1 className="text-4xl">Word Flow</h1>
          <p className="text-xs italic">WIP - Proof of concept</p>
        </div>
        <Navbuttons />
      </nav>
      <WordFlowContainer />
      <TopScoreContainer />
    </main>
  );
}
