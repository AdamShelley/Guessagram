
type ToggleProps = {
  setShowRules: (toggle: boolean) => void;
};

export default function Rules({setShowRules}: ToggleProps) {
  return (
    <div
      className="fixed bg-black/10 w-full h-full z-20 left-0 top-0"
      onClick={() => setShowRules(false)}
    >
      <div className="text-black absolute bg-slate-100 w-11/12  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-sm flex flex-col gap-6 lg:w-1/2">
        <h2 className="text-xl">Rules to play</h2>
        <ul className="text-left ">
          <li>
            <p>1. Only use 6 letters.</p>
          </li>
          <li>
            <p>2. You can reuse letters.</p>
          </li>
          <li>
            <p>3. Minimum of 3 letters in a word.</p>
          </li>
          <li>
            <p>
              3. You have <span className="font-bold">10</span> chances, pick
              your words wisely.
            </p>
          </li>
          <li>
            <p>4. Once you press submit, that is it for the day.</p>
          </li>
          <li>
            <p>5. There is a big bonus if you can use all letters. </p>
          </li>
        </ul>

        <button
          onClick={() => setShowRules(false)}
          className="bg-teal-900 text-sm text-white py-2 px-4"
        >
          Close rules
        </button>
      </div>
    </div>
  );
}
