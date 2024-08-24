"use client";

import { useState } from "react";
import { Lock, Unlock, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Component() {
  const [progress, setProgress] = useState(0);
  const [openModal, setOpenModal] = useState(null);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: "API Call Challenge",
      completed: false,
      description:
        "Make an API call to create or update a user with the parameter 'imanerd': true",
      question: "What's the correct API endpoint to use?",
      correctAnswer: "/api/user"
    },
    {
      id: 2,
      title: "Hidden Element Hunt",
      completed: false,
      description: "Find and interact with a hidden element on the page",
      question: "What's the ID of the hidden element?",
      correctAnswer: "secretDiv"
    },
    {
      id: 3,
      title: "Button ID Quest",
      completed: false,
      description: "Find the ID of a specific button on the page",
      question: "What's the ID of the red button?",
      correctAnswer: "dangerButton"
    },
    {
      id: 4,
      title: "Invisible Button Clickathon",
      completed: false,
      description: "Click three invisible buttons on the page",
      question: "In what order should the buttons be clicked?",
      correctAnswer: "213"
    },
    {
      id: 5,
      title: "Console Hacker",
      completed: false,
      description: "Use the browser console to interact with a hidden function",
      question: "What's the return value of the secretFunction()?",
      correctAnswer: "h4ck3r"
    },
    {
      id: 6,
      title: "SQL Injection Simulation",
      completed: false,
      description:
        "Simulate a SQL injection attack in a controlled environment",
      question: "What input would you use to bypass the login?",
      correctAnswer: "' OR '1'='1"
    },
    {
      id: 7,
      title: "Cryptography Challenge",
      completed: false,
      description: "Decrypt a message using a given cipher",
      question: "Decrypt: Khoor Zruog! What's the original message?",
      correctAnswer: "Hello World!"
    },
    {
      id: 8,
      title: "RegEx Riddle",
      completed: false,
      description: "Create a regular expression to match a specific pattern",
      question: "Write a RegEx to match all valid email addresses",
      correctAnswer: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"
    },
    {
      id: 9,
      title: "JWT Decoder",
      completed: false,
      description: "Decode a JSON Web Token to find a hidden message",
      question: "What's the 'secret' claim in the decoded JWT?",
      correctAnswer: "youreahacker"
    }
  ]);

  const [icon, setIcon] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIcon((icon) => (icon + 1) % 7);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const openChallenge = (id: any) => {
    setOpenModal(id);
    setAnswer("");
    setError("");
  };

  const closeChallenge = () => {
    setOpenModal(null);
    setAnswer("");
    setError("");
  };

  const submitAnswer = () => {
    const challenge = challenges.find((c) => c.id === openModal);
    if (
      challenge &&
      answer.toLowerCase() === challenge.correctAnswer.toLowerCase()
    ) {
      setChallenges(
        challenges.map((c) =>
          c.id === openModal ? { ...c, completed: true } : c
        )
      );
      setProgress(
        ((challenges.filter((c) => c.completed).length + 1) /
          challenges.length) *
          100
      );
      closeChallenge();
    } else {
      setError("Incorrect answer. Try again!");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 sm:px-12 md:px-24">
      <div className="min-h-screen bg-gray-100 text-gray-900 ">
        <header className="sticky top-0 z-10 bg-[#FFF]">
          <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-6 lg:px-4">
            <Link
              href="#"
              className="flex items-center pr-2 text-lg font-semibold"
              prefetch={false}
            >
              <span>
                <div className="icon-container">
                  <img
                    className={icon == 0 ? "flex w-10  md:w-14" : "hidden"}
                    src="go.png"
                    alt="GO"
                  />
                  <img
                    className={icon == 1 ? "flex w-12 md:w-16" : "hidden"}
                    src="ts.png"
                    alt="TypeScript"
                  />
                  <img
                    className={icon == 2 ? "flex w-14 md:w-[72px]" : "hidden"}
                    src="react.png"
                    alt="React.js"
                  />
                  <img
                    className={icon == 3 ? "flex w-14 md:w-[72px]" : "hidden"}
                    src="py.png"
                    alt="Python"
                  />
                  <img
                    className={icon == 4 ? "flex w-16 md:w-20" : "hidden"}
                    src="next.svg"
                    alt="Next"
                  />
                  <img
                    className={icon == 5 ? "flex w-16 md:w-20" : "hidden"}
                    src="retool.png"
                    alt="Retool"
                  />
                  <img
                    className={icon == 6 ? "flex w-10 md:w-16" : "hidden"}
                    src="bubble.png"
                    alt="Bubble"
                  />
                </div>
              </span>
            </Link>
            <nav className="hidden sm:flex ml-auto items-center gap-1 sm:gap-2 lg:gap-4">
              <Link
                href="/#about"
                className="text-sm font-medium md:text-[16px] hover:underline"
                prefetch={false}
              >
                About
              </Link>
              <Link
                href="/#skills"
                className="text-sm md:text-[16px] font-medium hover:underline"
                prefetch={false}
              >
                Skills
              </Link>
              <Link
                href="/#projects"
                className="text-sm md:text-[16px] font-medium hover:underline"
                prefetch={false}
              >
                Projects
              </Link>
              <Link
                href="/"
                className="text-sm md:text-[16px] font-medium hover:underline"
                prefetch={false}
              >
                Home
              </Link>
              <Link
                href="/#contact"
                className="text-sm md:text-[16px] font-medium hover:underline"
                prefetch={false}
              >
                Contact
              </Link>
            </nav>
            <Link href={"/"} className="sm:hidden">
              Home
            </Link>
          </div>
        </header>
        <Progress value={progress} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 px-12 max-w-6xl ">
          {challenges.map((challenge) => (
            <Card key={challenge.id}>
              <CardHeader>
                <CardTitle className="flex flex-row items-center justify-between text-xl">
                  <span>{challenge.title}</span>
                  {challenge.completed ? (
                    <Unlock className="ml-auto text-green-500" />
                  ) : (
                    <Lock className="ml-auto text-red-500" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-auto">{challenge.description}</p>
                <Button
                  onClick={() => openChallenge(challenge.id)}
                  variant={challenge.completed ? "success" : "primary"}
                  className="h-full mt-auto"
                >
                  {challenge.completed ? "Completed" : "Start Challenge"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={openModal !== null} onOpenChange={closeChallenge}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {challenges.find((c) => c.id === openModal)?.title}
              </DialogTitle>
              <DialogDescription>
                {challenges.find((c) => c.id === openModal)?.description}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label
                htmlFor="answer"
                className="text-lg font-semibold block mb-2"
              >
                {challenges.find((c) => c.id === openModal)?.question}
              </Label>
              <Input
                id="answer"
                value={answer}
                onChange={(e: any) => setAnswer(e.target.value)}
                placeholder="Enter your answer here"
                error={error}
              />
              {error && <p className="mt-2 text-red-500">{error}</p>}
            </div>
            <DialogFooter>
              <Button onClick={submitAnswer} variant="primary">
                Submit Answer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}

// Custom components

const Button = ({ variant = "primary", children, ...props }: any) => {
  const variants = {
    primary: "bg-[#E33] hover:bg-red-600 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    success: "bg-green-500 hover:bg-green-600 text-white"
  };

  return (
    <button
      className={`px-4 py-2 rounded transition-colors bg-[#E33] hover:bg-red-600 text-white`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ error, ...props }: any) => (
  <input
    className={`w-full px-3 py-2 border rounded transition-colors ${
      error ? "border-red-500" : "border-gray-300"
    } focus:outline-none focus:ring-2 focus:ring-red-500`}
    {...props}
  />
);

const Card = ({ children }: any) => (
  <div className="bg-white border-2 border-red-500 rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
    {children}
  </div>
);

const CardHeader = ({ children }: any) => (
  <div className="p-4 border-b border-gray-200 flex flex-row">{children}</div>
);

const CardTitle = ({ children }: any) => (
  <div className="text-xl font-semibold flex flex-row justify-between w-full">
    {children}
  </div>
);

const CardContent = ({ children }: any) => (
  <div className="p-4 flex flex-col min-h-[120px]">{children}</div>
);

const Progress = ({ value }: any) => (
  <div className="w-full bg-[#eee] rounded-full h-2.5">
    <div
      className="bg-[#E33] h-2.5 rounded-full transition-all duration-500 ease-out"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

const Dialog = ({ open, onOpenChange, children }: any) =>
  open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-lg mx-auto my-6">
        <div className="relative flex flex-col w-full bg-[#FFF] rounded border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          {children}
        </div>
      </div>
      <div
        className="fixed inset-0 z-30 bg-[#000] opacity-25"
        onClick={onOpenChange}
      ></div>
    </div>
  ) : null;

const DialogContent = ({ children }: any) => (
  <div className="relative flex flex-col w-full z-50 bg-[#fff] rounded-md p-4">
    {children}
  </div>
);

const DialogHeader = ({ children }: any) => (
  <div className="flex flex-col items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
    {children}
  </div>
);

const DialogTitle = ({ children }: any) => (
  <h3 className="text-2xl font-semibold">{children}</h3>
);

const DialogDescription = ({ children }: any) => (
  <p className="mt-2 text-sm text-gray-500">{children}</p>
);

const DialogFooter = ({ children }: any) => (
  <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
    {children}
  </div>
);

const Label = ({ htmlFor, children, ...props }: any) => (
  <label htmlFor={htmlFor} {...props}>
    {children}
  </label>
);
