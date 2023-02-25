
type ToggleProps = {
    setShowStats: (toggle: boolean) => void;
  };
  
  export default function Stats({setShowStats}: ToggleProps) {
    return (
      <div
        className="fixed bg-black/10 w-full h-full z-20 left-0 top-0"
        onClick={() => setShowStats(false)}
      >
        <div className="text-black absolute bg-white w-11/12  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-sm flex flex-col gap-6">
          <h2 className="text-xl">Your Stats</h2>
          
          <p>WIP - come back later 😉</p>
  
          <button
            onClick={() => setShowStats(false)}
            className="bg-teal-600 text-sm text-white py-2 px-4"
          >
            Close Stats
          </button>
        </div>
      </div>
    );
  }
  