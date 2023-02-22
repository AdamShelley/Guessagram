import GuessContainer from "./components/WordContainer/GuessContainer/GuessContainer";
import WordContainer from "./components/WordContainer/TodaysLetters/WordContainer";
import TopScoreContainer from "./components/HighscoreContainer/TopScoreContainer";
import WordFlowContainer from "./components/WordContainer/WordFlowContainer";

export default function Home() {
  return (
    <main className="bg-gray-800 p-5 h-max">
      <h1 className="text-4xl">Word Flow</h1>
      <p className="text-sm italic">WIP - Proof of concept</p>
      
      <WordFlowContainer/> 
      <TopScoreContainer />
    </main>
  );
}

{/* <span
          onClick={(e) => setToggle(true)}
          className="border-solid border-white-100 border-2 rounded-lg p-2 m-auto"
        >
          i
        </span> */}