type ShareTypes = {
  correctWordlist: string[];
  totalScore: number;
};

export default function ShareScore({
  correctWordlist,
  totalScore,
}: ShareTypes) {


  const codePointBase = "31-FE0F-20E3";
  const emoji = codePointBase
    .split("-")
    .map((codePoint) => String.fromCodePoint(`0x${codePoint}`)).join("");


    


  const message = `Check out my score on *Guesswords*\nMy total score was: ${totalScore} from ${
    correctWordlist.length
  } words.\nMy words were: ${correctWordlist.map(
    (word, index) => `\n${emoji}: ${word}`
  )}
  `;

  // U+0031 U+FE0F U+20E3
  const shareScore = () => {
    if (navigator.share) {
      navigator.share({
        title: "Sharing your Guesswords score",
        text: message,
      });
    }
  };

  return (
    <div className="mt-5 md:invisible">
      <button
        className="md:invisible text-md text-white border border-violet-500 rounded-lg p-3 bg-violet-500 hover:bg-violet-900 cursor-pointer"
        onClick={shareScore}
      >
        Share
      </button>
    </div>
  );
}
