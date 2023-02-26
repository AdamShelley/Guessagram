"use client";

import { useState } from "react";
import Rules from "../Rules/Rules";
import Stats from "./Stats";

export default function Navbuttons() {
  const [showRules, setShowRules] = useState(false);
  const [showStats, setShowStats] = useState(false);

  return (
    <>
      <ul className="flex align-center justify-center text-center">
        <li>
          <button
            className="w-8 h-8 bg-slate-700 m-1 rounded-md text-xs"
            onClick={() => setShowRules(true)}
          >
            i
          </button>
        </li>
        <li>
          <button
            onClick={() => setShowStats(true)}
            className="w-12 h-8 bg-slate-700 m-1 rounded-md text-xs"
          >
            Stats
          </button>
        </li>
      </ul>
      {showRules && <Rules setShowRules={setShowRules} />}
      {showStats && <Stats setShowStats={setShowStats} />}
    </>
  );
}
