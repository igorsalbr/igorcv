import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface MemoryGameProps {
  userID: string;
}

interface CardType {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const emojis = ["🚀", "⚡️", "🎮", "🎨", "🎯", "🎪", "🎭", "🎷"];
const createDeck = () => {
  const cards = [...emojis, ...emojis]
    .map((content, index) => ({
      id: index,
      content,
      isFlipped: false,
      isMatched: false
    }))
    .sort(() => Math.random() - 0.5);
  return cards;
};

export function MemoryGame({ userID }: MemoryGameProps) {
  const [cards, setCards] = useState<CardType[]>(createDeck());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    const savedBestScore = localStorage.getItem(
      `memoryGame_bestScore_${userID}`
    );
    if (savedBestScore) {
      setBestScore(Number.parseInt(savedBestScore));
    }
  }, [userID]);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isMatched || cards[id].isFlipped)
      return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newFlippedCards;
      if (newCards[first].content === newCards[second].content) {
        setTimeout(() => {
          const matchedCards = newCards.map((card) =>
            card.id === first || card.id === second
              ? { ...card, isMatched: true }
              : card
          );
          setCards(matchedCards);
          setFlippedCards([]);

          if (matchedCards.every((card) => card.isMatched)) {
            setIsWon(true);
            if (!bestScore || moves + 1 < bestScore) {
              setBestScore(moves + 1);
              localStorage.setItem(
                `memoryGame_bestScore_${userID}`,
                String(moves + 1)
              );
            }
            confetti();
          }
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = newCards.map((card) =>
            card.id === first || card.id === second
              ? { ...card, isFlipped: false }
              : card
          );
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setCards(createDeck());
    setFlippedCards([]);
    setMoves(0);
    setIsWon(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-lg mb-2">
          Moves: {moves} {bestScore && `| Best Score: ${bestScore}`}
        </p>
        <Button onClick={resetGame} className="bg-[#E33] hover:bg-[#D22]">
          New Game
        </Button>
      </div>

      <div className={`grid grid-cols-4 gap-4 ${!userID ? "hidden" : ""}`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`aspect-square flex items-center justify-center text-4xl cursor-pointer transition-all duration-300 ${
              card.isFlipped || card.isMatched ? "opacity-100" : "opacity-0"
            } ${card.isMatched ? "opacity-50" : ""}`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.isFlipped || card.isMatched ? card.content : "?"}
          </Card>
        ))}
      </div>

      {isWon && (
        <div className="text-center mt-8">
          <h3 className="text-2xl font-bold mb-4">🎉 Congratulations! 🎉</h3>
          <p className="text-lg mb-4">You won in {moves} moves!</p>
          {bestScore === moves && (
            <p className="text-[#E33] font-bold">New Best Score!</p>
          )}
        </div>
      )}
    </div>
  );
}

function confetti() {
  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff"
  ];
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.position = "fixed";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-10vh";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animation = "fall 5s linear infinite";

    document.body.appendChild(confetti);
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}
