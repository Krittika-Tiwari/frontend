export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 flex items-center justify-center">
      <div className="space-y-4 text-center px-6">
        <div
          role="status"
          aria-live="polite"
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-4 border-t-transparent border-amber-500"
        >
          <svg
            className="h-6 w-6 animate-spin text-zinc-950"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>

        <div>
          <p className="text-xl font-medium bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Loading…
          </p>

          <p className="text-sm text-zinc-400">
            Fetching recipes and nutrition information...
          </p>
        </div>
      </div>
    </div>
  );
}
