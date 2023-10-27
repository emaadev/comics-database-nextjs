import Link from "next/link";
import { Button, Text } from "@nextui-org/react";

export function Header() {
  return (
    <header className="m-auto w-full max-w-[1000px] pt-4 px-5 flex justify-between">
      <div>
        <h3 className="font-bold">
          Next<span className="font-light">XKCD</span>
        </h3>
      </div>
      <nav>
        <ul className="flex gap-6 text-gray-800 font-semibold text-sm">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/search">Search</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
