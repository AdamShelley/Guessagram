import { LetterClick } from "@/app/types/LetterClickType";
import LetterCard from "./LetterCard";

export default function WordContainer({setLetterClick, setWord}:LetterClick) {
  return (
    <div className="mt-20 text-center">
      <h2>Todays letters</h2>
      <div className="mt-5">
        <LetterCard setLetterClick={setLetterClick} setWord={setWord}/>
      </div>
    </div>
  );
}
