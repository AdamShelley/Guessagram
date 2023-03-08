import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ToggleProps = {
  setShowStats: (toggle: boolean) => void;
  statisticsLocalStorage: {
    daysPlayed: number;
    totalWords: number;
    totalScore: number;
    totalGuessAttempts: number;
  };
};

export default function Stats({
  setShowStats,
  statisticsLocalStorage,
}: ToggleProps) {
  if (!statisticsLocalStorage) {
    return (
      <div
        className="fixed bg-black/40 w-full h-full z-20 left-0 top-0"
        onClick={() => setShowStats(false)}
      >
        <div className="text-white absolute bg-slate-800 border border-slate-700 w-11/12  top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-3/4 p-8 rounded-sm flex flex-col justify-start gap-6 lg:w-5/12">
          <FontAwesomeIcon
            onClick={() => setShowStats(false)}
            className="text-center text-white text-xl ml-auto lg:text-xl"
            icon={faXmark}
          />
          <h2 className="text-center text-xl text-white">Statistics</h2>
          <p>There are no stats to show you yet!</p>
        </div>
      </div>
    );
  }

  const { daysPlayed, totalWords, totalScore, totalGuessAttempts } =
    statisticsLocalStorage;

  return (
    <div
      className="fixed bg-black/40 w-full h-full z-20 left-0 top-0"
      onClick={() => setShowStats(false)}
    >
      <div className="text-white absolute bg-slate-800 border border-slate-700 w-11/12  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4 p-4 rounded-sm flex flex-col gap-3 lg:w-5/12">
        <FontAwesomeIcon
          onClick={() => setShowStats(false)}
          className="text-center text-white text-xl ml-auto lg:text-xl"
          icon={faXmark}
        />
        <h2 className="px-4 text-left text-xl text-white">Statistics</h2>

        <ul className="text-left text-sm md:text-lg p-4">
          <li className="mt-4 text-md">
            Days Played:{" "}
            <span className=" text-white text-xl ml-5">
              {daysPlayed}
            </span>
          </li>
          <li className="mt-4 text-md">
            Total words guessed:{" "}
            <span className=" text-white text-xl ml-5">
              {totalWords}
            </span>
          </li>
          <li className="mt-4 text-md">
            Total correct words:{" "}
            <span className=" text-white text-xl ml-5">
              {totalWords}/{totalGuessAttempts} ({(totalWords/totalGuessAttempts) * 100}%)
            </span>
          </li>
          <li className="mt-4 text-md">
            Total Score:{" "}
            <span className=" text-white text-xl ml-5">
              {totalScore}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
