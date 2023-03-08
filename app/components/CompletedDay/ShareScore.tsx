type ShareTypes = {
  correctWordlist: string[];
  totalScore: number;
};

export default function ShareScore({
  correctWordlist,
  totalScore,
}: ShareTypes) {


  // const codePointBase = [0x31,0xFE0F,0x20E3];
  // const emoji = codePointBase
  //   .map((codePoint) => {
  //     String.fromCodePoint(codePoint)
  //   }).join('')





  const message = `Check out my score on *Guesswords*\nMy total score was: ${totalScore} from ${
    correctWordlist.length
  } words.\nMy words were: ${correctWordlist.map(
    (word, index) => `\n${index}: ${word}`
  )}
  `;

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
        className="md:invisible text-md text-white border border-violet-800 rounded-lg p-1 px-4 bg-violet-800 hover:bg-violet-900 cursor-pointer"
        onClick={shareScore}
      >
        Share
      </button>
    </div>
  );
}
