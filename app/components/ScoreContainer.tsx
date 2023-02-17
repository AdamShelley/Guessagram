interface CorrectWordProp {
  correctWordlist: string[];
}

export default function ScoreContainer({ correctWordlist }: CorrectWordProp) {
  console.log(correctWordlist);

  return (
    <div>
      <h3>Score Container</h3>
      <ul className="m-5">
        {correctWordlist?.map((word) => (
          <li className="m-2 p-2 flex align-center">
            <p className="text-gray-100 text-2xl">{word}</p>
            <p className="m-2">2 points</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
