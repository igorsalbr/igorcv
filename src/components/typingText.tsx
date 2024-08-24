import { useEffect, useState } from "react";

const TypingEffect = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    "This is my Interactive CV",
    "Engage with the challenging puzzles!",
    "Sign up for keeping track of your progress",
    "Explore my skills and experience",
    "Leave me a feedback or a message :)",
    "Enjoy the journey and have fun!"
  ];

  useEffect(() => {
    if (index < texts[textIndex].length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + texts[textIndex].charAt(index));
        setIndex(index + 1);
      }, 35); // Ajuste o tempo para a velocidade de digitação desejada

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setIndex(0);
        setTextIndex((textIndex + 1) % texts.length);
        setText("");
      }, 1100); // Tempo de espera antes de começar a digitar o próximo texto

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
