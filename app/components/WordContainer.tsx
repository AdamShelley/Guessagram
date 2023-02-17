import LetterCard from "./LetterCard";

export default function WordContainer() {

// Letter generator
  function generateRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    return alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase();
  }



  return (
    <div className="p-5">
      <h2>Word Container</h2>

      <div>
        <LetterCard letter={generateRandomLetter()} />
      </div>
    </div>
  );
}
