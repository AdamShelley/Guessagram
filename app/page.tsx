import GuessContainer from "./components/GuessContainer";
import WordContainer from "./components/WordContainer";
import TopScoreContainer from "./components/TopScoreContainer";
import { generateLetters } from "./utils/letterGenerator";

export default function Home() {
  // Check for new day

  let letters: string[] = generateLetters({
    vowels: 2,
  });

  const midnightReset = () => {
    const now = new Date();
    // let night = now;
    // night.setDate(new Date().getDate() + 1);
    // night.setHours(0, 0, 0);

    let night = new Date(now.getTime() + 10000);

    let msToMidnight = night.getTime() - now.getTime();

    setTimeout(() => {
      console.log("Generating new letters");
      letters = generateLetters({
        vowels: 2,
      });

      console.log(letters);
      midnightReset();
    }, msToMidnight);
  };

  midnightReset();

  return (
    <main className="bg-gray-800 p-5">
      <h1 className="text-2xl">Word Flow</h1>
      <WordContainer letters={letters} />
      <GuessContainer letters={letters} />
      <TopScoreContainer />
    </main>
  );
}
