import TopScoreTable from "./TopScoreTable";

export default function TopScoreContainer() {
  return (
    // border border-slate-700 p-2 rounded-lg shadow-lg
    <div className="bg-slate-800   mt-10">
      <h2 className="text-xl mt-5 pl-3">High Scores</h2>
      <table className="mt-5 mb-10 w-full table-auto border-collapse  text-sm">
        <thead>
          <tr>
            <th className="p-2 border border-slate-600  bg-slate-700">Place</th>
            <th className="p-2 border border-slate-600  bg-slate-700">Score</th>
            <th className="p-2 border border-slate-600  bg-slate-700">Name</th>
            <th className="p-2 border border-slate-600  bg-slate-700">
              Best Word
            </th>
          </tr>
        </thead>
        <TopScoreTable />
      </table>
    </div>
  );
}
