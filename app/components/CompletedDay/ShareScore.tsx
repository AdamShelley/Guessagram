type ShareTypes = {
  correctWordlist: string[];
  totalScore: number;
};

export default function ShareScore({
  correctWordlist,
  totalScore,
}: ShareTypes) {
  const message = `Check out my score on *Guesswords*\n
  My total score was: ${totalScore} from ${correctWordlist.length} words.\n
  My words were: ${correctWordlist.map(
    (word, index) => `${index + 1}: ${word}\n`
  )}
  `;

  // U+0031 U+FE0F U+20E3
  const shareScore = () => {
    if (navigator.share) {
      navigator.share({
        title: "We sharing this",
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
