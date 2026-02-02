import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center px-6">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="text-center max-w-lg">
        <h1 className="text-[150px] md:text-[200px] font-bold leading-none bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 -mt-4">
          Seite nicht gefunden
        </h2>
        <p className="text-gray-400 mb-8">
          Die angeforderte Seite existiert nicht oder die Unternehmens-ID ist ungültig. 
          Bitte überprüfen Sie die URL und versuchen Sie es erneut.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}
