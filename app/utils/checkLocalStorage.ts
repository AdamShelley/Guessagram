export const checkLocalStorage = () => {
  console.log("Checking local storage");
  const submit = localStorage.getItem("word-flow-submit")!;

  return JSON.parse(submit);
};
