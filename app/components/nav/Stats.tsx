import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ToggleProps = {
  setShowStats: (toggle: boolean) => void;
  statisticsLocalStorage: {
    daysPlayed: number;
    totalWords: number;
    totalScore: number;
  };
};

export default function Stats({
  setShowStats,
  statisticsLocalStorage,
}: ToggleProps) {

  if (!statisticsLocalStorage){
    return (
      <div
      className="fixed bg-black/40 w-full h-full z-20 left-0 top-0"
      onClick={() => setShowStats(false)}
    >
      <div className="text-white absolute bg-slate-800 border border-slate-700 w-11/12  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4 p-8 rounded-sm flex flex-col gap-6 lg:w-5/12">
        <FontAwesomeIcon
          onClick={() => setShowStats(false)}
          className="text-center text-white text-xl ml-auto lg:text-xl"
          icon={faXmark}
        />
        <h2 className="text-center text-xl text-white">Statistics</h2>
        <p>There are no stats to show you yet!</p>

      </div>
    </div>
    )

  }


  const { daysPlayed, totalWords, totalScore } = statisticsLocalStorage;

  return (
    <div
      className="fixed bg-black/40 w-full h-full z-20 left-0 top-0"
      onClick={() => setShowStats(false)}
    >
      <div className="text-white absolute bg-slate-800 border border-slate-700 w-11/12  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4 p-8 rounded-sm flex flex-col gap-6 lg:w-5/12">
        <FontAwesomeIcon
          onClick={() => setShowStats(false)}
          className="text-center text-white text-xl ml-auto lg:text-xl"
          icon={faXmark}
        />
        <h2 className="text-center text-xl text-white">Statistics</h2>

        <ul className="text-left text-sm md:text-lg">
          <li>Days Played: {daysPlayed}</li>
          <li>Total words guessed: {totalWords}</li>
          <li>Total correct words?:</li>
          <li>Total Score: {totalScore}</li>
        </ul>
      </div>
    </div>
  );
}
