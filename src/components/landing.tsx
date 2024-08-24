"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import TypingEffect from "@/components/typingText";

export function Landing() {
  const [icon, setIcon] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIcon((icon) => (icon + 1) % 7);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-[#FFF]">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-2 sm:px-6 lg:px-4">
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
              href="#about"
              className="text-sm font-medium md:text-[16px] hover:underline"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#skills"
              className="text-sm md:text-[16px] font-medium hover:underline"
              prefetch={false}
            >
              Skills
            </Link>
            <Link
              href="#projects"
              className="text-sm md:text-[16px] font-medium hover:underline"
              prefetch={false}
            >
              Projects
            </Link>
            <Link
              href="/puzzles"
              className="text-sm md:text-[16px] font-medium hover:underline"
              prefetch={false}
            >
              Puzzles
            </Link>
            <Link
              href="#contact"
              className="text-sm md:text-[16px] font-medium hover:underline"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
          <Link href={"/puzzles"} className="sm:hidden">
            Puzzles
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section
          id="hero"
          className="container mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 px-4 pb-8 sm:px-6 lg:px-8 lg:pb-12"
        >
          <img src="/igor.png" className="max-w-[50%] mt-10" />
          <div className="space-y-4 text-center">
            <h1 className="text-2xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
              Welcome to a little piece of my mind. 🧠
            </h1>
            <div className="flex-row flex items-center justify-center ">
              <TerminalIcon className="h-8 w-8 inline-block mr-5" />
              <TypingEffect />
            </div>
          </div>
          <Link href="#about">
            <Button className="flex items-center gap-2 bg-[#E33]">
              <PlayIcon className="h-5 w-5" />
              Start Exploring
            </Button>
          </Link>
        </section>
        <section
          id="about"
          className="container mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              About Me
            </h2>
            <p className="text-muted-foreground md:text-xl">
              I am a full-stack developer with a passion for creating innovative
              and interactive web experiences. I have a strong background in
              both front-end and back-end development, and I am always eager to
              learn new technologies and techniques.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                <CodeIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-semibold">Coding Skills</h3>
                <p className="text-center text-muted-foreground">
                  Proficient in a wide range of programming languages and
                  frameworks, including React, Node.js, and Python.
                </p>
                <Button
                  variant="ghost"
                  className="mt-4 bg-[#E33] text-[#fff] rounded-md"
                  onClick={() => {
                    //startCodingSkillsPuzzle();
                  }}
                >
                  Explore Coding Skills
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                <PuzzleIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-semibold">Problem-Solving</h3>
                <p className="text-center text-muted-foreground">
                  Adept at breaking down complex problems and finding creative
                  solutions.
                </p>
                <Button
                  variant="ghost"
                  className="mt-4 bg-[#E33] text-[#fff] rounded-md"
                  onClick={() => {
                    //startProblemSolvingPuzzle();
                  }}
                >
                  Explore Problem-Solving
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                <BriefcaseIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-semibold">Work Experience</h3>
                <p className="text-center text-muted-foreground">
                  Extensive experience working on a variety of web projects for
                  clients and employers.
                </p>
                <Button
                  variant="ghost"
                  className="mt-4 bg-[#E33] text-[#fff] rounded-md"
                  onClick={() => {
                    //startWorkExperiencePuzzle();
                  }}
                >
                  Explore Work Experience
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        <section
          id="skills"
          className="container mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              My Skills
            </h2>
            <p className="text-muted-foreground md:text-xl">
              Explore my technical skills and expertise through a series of
              interactive challenges.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                <CodepenIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-semibold">React</h3>
                <p className="text-center text-muted-foreground">
                  Proficient in building complex and responsive user interfaces
                  using React.
                </p>
                <Button
                  variant="ghost"
                  className="mt-4 bg-[#E33] text-[#fff] rounded-md"
                  onClick={() => {
                    //startReactSkillsPuzzle();
                  }}
                >
                  Explore React Skills
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                <NetworkIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-semibold">Node.js</h3>
                <p className="text-center text-muted-foreground">
                  Experienced in building scalable and efficient back-end
                  applications using Node.js.
                </p>
                <Button
                  variant="ghost"
                  className="mt-4  bg-[#E33] text-[#fff] rounded-md"
                  onClick={() => {
                    //startNodeSkillsPuzzle();
                  }}
                >
                  Explore Node.js Skills
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                <DatabaseIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-semibold">Databases</h3>
                <p className="text-center text-muted-foreground">
                  Knowledgeable in working with various databases, including SQL
                  and NoSQL.
                </p>
                <Button
                  variant="ghost"
                  className="mt-4  bg-[#E33] text-[#fff] rounded-md"
                  onClick={() => {
                    //startDatabaseSkillsPuzzle();
                  }}
                >
                  Explore Database Skills
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        <section
          id="projects"
          className="container mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              My Projects
            </h2>
            <p className="text-muted-foreground md:text-xl">
              Explore some of my past projects and the challenges I faced in
              developing them.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                <LaptopIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-semibold">E-commerce Platform</h3>
                <p className="text-center text-muted-foreground">
                  Developed a scalable and feature-rich e-commerce platform
                  using React, Node.js, and a NoSQL database.
                </p>
                <Button
                  variant="ghost"
                  className="mt-4  bg-[#E33] text-[#fff] rounded-md"
                  onClick={() => {
                    // startEcommerceProjectPuzzle();
                  }}
                >
                  Explore E-commerce Project
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                <SmartphoneIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-semibold">Mobile App</h3>
                <p className="text-center text-muted-foreground">
                  Developed a cross-platform mobile app using React Native and
                  integrated with various APIs.
                </p>
                <Button
                  variant="ghost"
                  className="mt-4  bg-[#E33] text-[#fff] rounded-md"
                  onClick={() => {
                    //startMobileAppProjectPuzzle();
                  }}
                >
                  Explore Mobile App Project
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                <CloudIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-semibold">Cloud Infrastructure</h3>
                <p className="text-center text-muted-foreground">
                  Designed and deployed scalable cloud infrastructure using AWS
                  and Terraform.
                </p>
                <Button
                  variant="ghost"
                  className="mt-4  bg-[#E33] text-[#fff] rounded-md"
                  onClick={() => {
                    // startCloudInfrastructureProjectPuzzle();
                  }}
                >
                  Explore Cloud Infrastructure Project
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        <section
          id="contact"
          className="container mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Contact Me
            </h2>
            <p className="text-muted-foreground md:text-xl">
              Get in touch with me to discuss potential opportunities or just to
              chat.
            </p>
          </div>
          <Card>
            <CardContent className="flex flex-col items-center justify-center gap-6 p-6 sm:p-8">
              <div className="grid w-full max-w-md gap-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    rows={4}
                  />
                </div>
              </div>
              <Button
                className="w-full max-w-md"
                onClick={() => {
                  //startContactFormPuzzle();
                }}
              >
                Submit
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      <footer className="bg-muted py-6"></footer>
    </div>
  );
}

function BriefcaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function CloudIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function CodeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function CodepenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
      <line x1="12" x2="12" y1="22" y2="15.5" />
      <polyline points="22 8.5 12 15.5 2 8.5" />
      <polyline points="2 15.5 12 8.5 22 15.5" />
      <line x1="12" x2="12" y1="2" y2="8.5" />
    </svg>
  );
}

function DatabaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

function LaptopIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  );
}

function NetworkIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </svg>
  );
}

function PlayIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function PuzzleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
    </svg>
  );
}

function SmartphoneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function TerminalIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  );
}
