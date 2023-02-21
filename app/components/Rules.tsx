"use client";

type ToggleProps = {
  setToggle: (toggle: boolean) => void;
};

export default function Rules({ setToggle }: ToggleProps) {
  return (
    <div
      className="fixed bg-black/10 w-full h-full z-20 left-0 top-0"
      onClick={() => setToggle(false)}
    >
      <div className="text-black absolute bg-white w-11/12  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-sm flex flex-col gap-6">
        <h2 className="text-xl">Rules to play Word Flow</h2>
        <ul className="text-left ">
          <li>
            <p>1. Only use 6 letters</p>
          </li>
          <li>
            <p>2. You can reuse letters</p>
          </li>
          <li>
            <p>
              3. You have <span className="font-bold">10</span> chances, pick
              your words wisely
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
          onClick={() => setToggle(false)}
          className="bg-teal-600 text-sm text-white py-2 px-4"
        >
          Close rules
        </button>
      </div>
    </div>
  );
}
