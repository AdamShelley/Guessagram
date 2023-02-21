import LetterCard from "./LetterCard";

export default function WordContainer() {
  return (
    <div className="mt-10 text-center">
      <h2>Todays letters</h2>
      <div className="">
        <LetterCard />
      </div>
    </div>
  );
}
