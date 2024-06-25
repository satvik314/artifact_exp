"use client";

import Link from "next/link";

const items = [
  {
    title: "Project Tile Motion",
    description: "A simple project to demonstrate tile motion.",
    link: "/project-tile-motion",
  },
];

export default function Home() {
  return (
    <div className="p-4 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold pt-24 text-center">Artifacts</h1>
      <div className="pt-44 grid place-items-center">
        <div className="grid grid-cols-1 gap-4">
          {items.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className="bg-muted w-60 h-44 grid place-content-center text-center gap-2 p-4 rounded-md border-2 hover:scale-105 transition duration-300"
            >
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
