"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Rules from "../Rules/Rules";
import Stats from "./Stats";

export default function Navbuttons() {
  const [showRules, setShowRules] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Get stats localStorage
  let statisticsLocalStorage = null;
  if (typeof window !== "undefined") {
    statisticsLocalStorage = JSON.parse(
      localStorage.getItem("personal-stats")!
    );
  }

  

  return (
    <>
      <ul className="flex align-center justify-center text-center">
        <li>
          <button
            className="w-8 h-8 bg-slate-700 m-1 rounded-md text-xs"
            onClick={() => setShowRules(true)}
          >
            <FontAwesomeIcon
              onClick={() => setShowStats(false)}
              className="text-center text-white text-md ml-auto lg:text-xl"
              icon={faInfo}
            />
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
      {showStats && (
        <Stats
          setShowStats={setShowStats}
          statisticsLocalStorage={statisticsLocalStorage}
        />
      )}
    </>
  );
}
