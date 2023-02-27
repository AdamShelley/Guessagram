import { LetterClick } from "@/app/types/LetterClickType";
import LetterCard from "./LetterCard";

export default function WordContainer({setLetterClick, setWord, submittedScore}:LetterClick) {
  return (
    <div className="mt-5 text-center">
      <h2>Todays letters</h2>
      <div className="mt-5">
        <LetterCard submittedScore={submittedScore} setLetterClick={setLetterClick} setWord={setWord}/>
      </div>
    </div>
  );
}
