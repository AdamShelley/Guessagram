export type LetterClick = {
  setLetterClick: (letter: string) => void;
  setWord: any;
  submittedScore: boolean
  setSubmittedScore: (submitted: boolean) => void;
  setCorrectWordlist: (list: string[] | []) => void;
};
