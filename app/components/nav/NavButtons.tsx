'use client'

import { useState } from "react";
import Rules from "../Rules/Rules";

export default function Navbuttons() {
  const [showRules, setShowRules] = useState(false);
  return (
    <>
      <ul>
        <li>
          <button className="text-2xl border-2 rounded-xl w-10 h-10 bg-slate-700" onClick={() => setShowRules(true)}>i</button>
        </li>
        <li></li>
      </ul>
      {showRules && <Rules setShowRules={setShowRules}/>}
    </>
  );
}
