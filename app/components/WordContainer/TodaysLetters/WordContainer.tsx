import { LetterClick } from "@/app/types/LetterClickType";
import LetterCard from "./LetterCard";

export default function WordContainer({
  setLetterClick,
  setWord,
  submittedScore,
}: LetterClick) {
  return (
    // ${submittedScore ? 'bg-slate-800 border border-slate-700 p-2 rounded-lg shadow-lg mt-10' : ''}
    <div className={`text-center mt-10`}>
      <h2>Today's Letters {submittedScore && ' were:'}</h2>
      <div className="mt-5">
        <LetterCard
          submittedScore={submittedScore}
          setLetterClick={setLetterClick}
          setWord={setWord}
        />
      </div>
    </div>
  );
}
