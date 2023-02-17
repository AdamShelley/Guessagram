interface OptionsProps {
  vowels: number;
}

export const generateLetters = (options: OptionsProps) => {
  let letterList: string[] = [];

  const generateVowels = (num: number) => {
    let vowels = "aeiou";

    for (let i = 0; i < num; i++) {
      const letter =
        vowels[Math.floor(Math.random() * vowels.length)];
      letterList.push(letter.toUpperCase());
      vowels = vowels.replace(letter, ""); 
    }
  };

  const generateAlphabet = (num:number) => {
    let alphabet = 'bcdfghjklmnpqrstvwxyz'

    for (let i = 0; i < num; i++) {
        const letter =
        alphabet[Math.floor(Math.random() * alphabet.length)];
        letterList.push(letter.toUpperCase());
        alphabet = alphabet.replace(letter, ""); 
      }
  }

  const loop = () => {
    
  }

  generateVowels(options.vowels);
  generateAlphabet(6- options.vowels)

  return letterList;
};
