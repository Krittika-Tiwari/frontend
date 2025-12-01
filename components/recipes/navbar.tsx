"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"
          >
            FoodLens
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
