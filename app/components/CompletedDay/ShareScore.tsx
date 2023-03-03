type ShareTypes = {
  correctWordlist: string[];
  totalScore: number;
};



export default function ShareScore({
  correctWordlist,
  totalScore,
}: ShareTypes) {

  

  const message = `Check out my score on *Guesswords*
  %0aMy total score was: ${totalScore} from ${correctWordlist.length} words. 
  %0aMy words were: ${correctWordlist.map(
    (word, index) => `%0a ${index + 1}: ${word}`
  )}
  `;

  // U+0031 U+FE0F U+20E3

  return (
    <div className="mt-5">
      <a
        href={`whatsapp://send?text=${message}`}
        data-action="share/whatsapp/share"
        target="_blank"
        className="text-sm text-white border border-violet-500 rounded-lg p-1 bg-violet-500 hover:bg-violet-900 cursor-pointer"
      >
        WhatsApp
      </a>
    </div>
  );
}
