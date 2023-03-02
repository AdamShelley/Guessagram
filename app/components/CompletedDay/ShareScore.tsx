
type ShareTypes = {
    correctWordlist: string[]
    totalScore: number
}


export default function ShareScore({correctWordlist, totalScore}: ShareTypes) {
  const message = `Check out my score on Guesswords
  %0aMy total score was: ${totalScore}
  %0aMy words were: ${correctWordlist.map((word, index) => (
    ` %0a${index + 1}: ${word}`
  ))}
  `;

  return (
    <div className="text-violet-400">
      <a
        href={`whatsapp://send?text=${message}`}
        data-action="share/whatsapp/share"
        target="_blank"
      >
        WhatsApp
      </a>
    </div>
  );
}
