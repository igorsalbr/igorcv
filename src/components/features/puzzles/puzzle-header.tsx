"use client"

import Link from "next/link"
import { RiAccountCircleLine } from "react-icons/ri"
import { IoMdExit } from "react-icons/io"

interface PuzzleHeaderProps {
  icon: number
  isAuthenticated: boolean
  logout: () => void
}

export function PuzzleHeader({ icon, isAuthenticated, logout }: PuzzleHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-[#FFF] border-b border-[#aaa] w-full outset-1 ">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-2 sm:px-4 lg:px-6">
        <Link href="#" className="flex items-center pr-2 text-lg font-semibold" prefetch={false}>
          <span>
            <div className="icon-container flex items-center flex-row">
              <div>Stack: &nbsp;</div>
              <img className={icon === 0 ? "flex w-14 md:w-[62px]" : "hidden"} src="go.png" alt="GO" />
              <img className={icon === 1 ? "flex w-14 md:w-[62px]" : "hidden"} src="ts.png" alt="TypeScript" />
              <img className={icon === 2 ? "flex w-14 md:w-[62px]" : "hidden"} src="react.png" alt="React.js" />
              <img className={icon === 3 ? "flex w-14 md:w-[62px]" : "hidden"} src="py.png" alt="Python" />
              <img className={icon === 4 ? "flex w-14 md:w-[62px]" : "hidden"} src="next.svg" alt="Next" />
              <img className={icon === 5 ? "flex w-14 md:w-[62px]" : "hidden"} src="retool.png" alt="Retool" />
              <img className={icon === 6 ? "flex w-14 md:w-[62px]" : "hidden"} src="bubble.png" alt="Bubble" />
            </div>
          </span>
        </Link>
        <nav className="hidden sm:flex mx-auto items-center gap-1 sm:gap-2 lg:gap-4">
          <Link href="/#about" className="text-sm font-medium md:text-[16px] hover:underline" prefetch={false}>
            About
          </Link>
          <Link href="/#contact" className="text-sm md:text-[16px] font-medium hover:underline" prefetch={false}>
            Contact
          </Link>
          <Link href="/" className="text-sm md:text-[16px] font-medium hover:underline" prefetch={false}>
            Home
          </Link>
        </nav>
        <Link href={"/"} className="sm:hidden mx-auto">
          Home
        </Link>
        {!isAuthenticated ? (
          <Link href={"/login"} className="ml-auto">
            <RiAccountCircleLine size={28} />
          </Link>
        ) : (
          <div onClick={logout} className="ml-auto cursor-pointer text-[#f33]">
            <IoMdExit size={28} />
          </div>
        )}
      </div>
    </header>
  )
}
