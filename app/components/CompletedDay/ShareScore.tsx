type ShareTypes = {
  correctWordlist: string[];
  totalScore: number;
};

export default function ShareScore({
  correctWordlist,
  totalScore,
}: ShareTypes) {


  const codePointBase = [0x31,0xFE0F,0x20E3];
  const emoji = codePointBase
    .map((codePoint) => {
      String.fromCodePoint(codePoint)
    })





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
