"use client";

import { useState } from "react";
import Rules from "../Rules/Rules";

export default function Navbuttons() {
  const [showRules, setShowRules] = useState(false);
  return (
    <>
      <ul className="flex align-center justify-center text-center">
        <li>
          <button
            className="w-8 h-8 bg-slate-700 m-1 rounded-md"
            onClick={() => setShowRules(true)}
          >
            i
          </button>
        </li>
        <li>
          <button onClick={() => {}} className="w-12 h-8 bg-slate-700 m-1 rounded-md">
            Stats
          </button>
        </li>
      </ul>
      {showRules && <Rules setShowRules={setShowRules} />}
    </>
  );
}
