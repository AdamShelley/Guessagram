interface CorrectWordProp {
  correctWordlist: string[];
}

interface ScoreOptions {
  [key: string]: number;
}

export default function ScoreContainer({ correctWordlist }: CorrectWordProp) {
  let score = 0;

  const calculateScore = (word: string) => {
    const scores: ScoreOptions = {
      a: 1,
      b: 3,
      c: 3,
      d: 2,
      e: 1,
      f: 4,
      g: 2,
      h: 4,
      i: 1,
      j: 8,
      k: 5,
      l: 1,
      m: 3,
      n: 1,
      o: 1,
      p: 3,
      q: 10,
      r: 1,
      s: 1,
      t: 1,
      u: 1,
      v: 4,
      w: 2,
      x: 8,
      y: 4,
      z: 10,
    };

    let wordScore: number = 0;

    word.split("").forEach((letter: string) => {
      const num: number = scores[letter];
      wordScore += num;
    });

    score += wordScore;
    return wordScore;
  };

  const wordListWithScore = correctWordlist.map((word) => {
    return {
      word,
      score: calculateScore(word),
    };
  });

  console.log(wordListWithScore);

  return (
    <div className="mt-5">
      <h3>Score Container</h3>
      <h4>Your Score: {score}</h4>
      <ul className="m-5">
        {wordListWithScore?.map((word) => (
          <li className="m-2 p-2 grid gap-2 grid-cols-2">
            <p className="text-gray-100 text-2xl">{word.word}</p>
            <p className="m-2">{word.score} points</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
