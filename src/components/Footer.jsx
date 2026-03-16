export default function Footer() {
  return (
    <footer className="border-t border-stone-200 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display text-stone-900 font-semibold">
          Demo<span className="text-stone-400">Site</span>
        </p>
        <p className="text-xs text-stone-400 font-mono tracking-wide">
          Built with React + Vite + Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
