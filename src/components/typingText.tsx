import { useEffect, useState } from "react";

const TypingEffect = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    "Welcome to My Interactive CV!",
    "Engage with the interactive puzzles",
    "Login for keeping track of your progress",
    "Explore my skills and experience",
    "Enjoy the journey and have fun!"
  ];

  useEffect(() => {
    if (index < texts[textIndex].length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + texts[textIndex].charAt(index));
        setIndex(index + 1);
      }, 100); // Ajuste o tempo para a velocidade de digitação desejada

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setIndex(0);
        setTextIndex((textIndex + 1) % texts.length);
        setText("");
      }, 2000); // Tempo de espera antes de começar a digitar o próximo texto

      return () => clearTimeout(timeout);
    }
  }, [index, textIndex]);

  return (
    <h1 className="typing-text">
      {text}
      <span className="cursor">|</span>
    </h1>
  );
};

export default TypingEffect;
