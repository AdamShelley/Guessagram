import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ToggleProps = {
  setShowRules: (toggle: boolean) => void;
};

export default function Rules({ setShowRules }: ToggleProps) {
  return (
    <div
      className="fixed bg-black/40 w-full h-full z-20 left-0 top-0"
      onClick={() => setShowRules(false)}
    >
      <div className="text-white absolute bg-slate-800 border border-slate-700 w-11/12  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4 p-8 rounded-sm flex flex-col gap-6 lg:w-5/12">
        <FontAwesomeIcon
          onClick={() => setShowRules(false)}
          className="text-center text-white text-xl ml-auto lg:text-xl cursor-pointer"
          icon={faXmark}
        />
        <h2 className="text-center text-xl text-white">Rules to play</h2>
        <p>
          Guess 10 words from the set of letters for the day, get the highest
          score possible with these letters.
        </p>
        <ul className="text-left text-sm md:text-lg">
          <li>
            <p>1. Only use 6 letters.</p>
          </li>
          <li className="mt-2">
            <p>2. You can reuse letters.</p>
          </li>
          <li className="mt-2">
            <p>3. Minimum of 3 letters in a word.</p>
          </li>
          <li className="mt-2">
            <p>
              3. You have <span className="font-bold">10</span> chances, pick
              your words wisely.
            </p>
          </li>
          <li className="mt-2">
            <p>4. There is a big bonus if you can use all letters. </p>
          </li>
          <li className="mt-2">
            <p>5. Once you press submit, that is it for the day.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
