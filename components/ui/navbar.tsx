"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <nav className="border-b bg-white dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold">
            FoodLens
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
