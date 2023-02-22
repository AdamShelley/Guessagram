import { LetterClick } from "@/app/types/LetterClickType";
import LetterCard from "./LetterCard";

export default function WordContainer({setLetterClick, setWord}:LetterClick) {
  return (
    <div className="mt-10 text-center">
      <h2>Todays letters</h2>
      <div className="">
        <LetterCard setLetterClick={setLetterClick} setWord={setWord}/>
      </div>
    </div>
  );
}
