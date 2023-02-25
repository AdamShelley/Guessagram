
import TopScoreTable from "./TopScoreTable";

export default function TopScoreContainer() {
  // Move loading into a table results component to render the skeleton fast?

  return (
    <div>
      <h2 className="text-2xl my-5 mt-20 ">High Scores</h2>
      <table className="mb-20 w-full table-auto border-separate border-spacing-1 border-spacing-y-2 ">
        <thead>
          <tr>
            <th className="p-2 border border-slate-600 font-bold bg-slate-500">
              Place
            </th>
            <th className="p-2 border border-slate-600 font-bold bg-slate-500">
              Score
            </th>
            <th className="p-2 border border-slate-600 font-bold bg-slate-500">
              Name
            </th>
            <th className="p-2 border border-slate-600 font-bold bg-slate-500">
              Best Word
            </th>
          </tr>
        </thead>
          <TopScoreTable/> 
      </table>
    </div>
  );
}
