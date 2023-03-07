import Footer from "./components/Footer";
import TopScoreContainer from "./components/HighscoreContainer/TopScoreContainer";
import Navbuttons from "./components/nav/NavButtons";
import WordFlowContainer from "./components/WordContainer/WordFlowContainer";

export default function Home() {
  return (
    <main className=" min-h-screen bg-gray-800 p-5  lg:h-screen flex flex-col align-center ">
      <nav className="flex justify-between align-center mt-2">
        <div>
          <h1 className="text-4xl">
            <span className="text-violet-400">Guess</span>words
          </h1>
        </div>
        <Navbuttons />
      </nav>
      <WordFlowContainer />
      <TopScoreContainer />
      <Footer />
    </main>
  );
}
