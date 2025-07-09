export default function Header() {
  return (
    <header className="w-full bg-blue-700 py-4 shadow">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Mazol-Pro"
            className="h-10 w-10"
          />
          <span className="text-white text-2xl font-bold">
            MAZOL-Pro
          </span>
        </div>
      </div>
    </header>
  );
}
