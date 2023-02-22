import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { checkLocalStorage } from "../../../utils/checkLocalStorage";
import GuessCard from "./GuessCard";
import SubmitSuccess from "../../CompletedDay/SubmitSuccess";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

type GuessProps = {
  letterClicked: string;
  setLetterClick: (letter: string) => void;
  word: string
  setWord: (letter: any) =>  void;
  error: string
};

const fetchLetters = async () => {
  const response = await axios.get("/api/highscore/getLetters");
  return response.data;
};

export default function GuessContainer({
  letterClicked,
  setLetterClick,
  word, 
  setWord,
  error
}: GuessProps) {


  let successSubmittedResult = false;

  useEffect(() => {
    if (typeof window !== "undefined") {
      successSubmittedResult = checkLocalStorage();
    }
  }, []);

  if (successSubmittedResult) return <SubmitSuccess />;

  const { data } = useQuery({
    queryFn: fetchLetters,
    queryKey: ["get-letters"],
  });

  const clickBackspace = () => {
    console.log("Backspace clicked");
    setWord((prev: string) => prev.slice(0, -1));
  };

  useEffect(() => {
    setWord((prev: string) => prev + letterClicked);
    setLetterClick("");
  }, [letterClicked]);

  return (
    <>
      {!successSubmittedResult && (
        <div className="flex flex-col">
          <div className="flex justify-center align-center py-2 mt-5">
            {data && (
              <div className="flex flex-col">
                <div className="mt-3 bg-slate-800 ">
                  {error && <p className="text-red-400">{error}</p>}
                </div>
                <div className="flex align-center justify-center">
                  <GuessCard
                    letters={data?.letter}
                    word={word}
                    setWord={setWord}
                  />
                  <FontAwesomeIcon onClick={clickBackspace} className="ml-2 text-3xl self-center" icon={faDeleteLeft}/>
                </div>
              </div>
            )}
          </div>

      
        </div>
      )}
    </>
  );
}
