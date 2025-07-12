import { useState, useRef, useEffect } from "react";
import { MdLanguage } from "react-icons/md";

const LANGUAGES = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
];

type Props = {
  value: string;
  onChange: (lang: string) => void;
};

export default function LanguageSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        className="flex items-center justify-center w-10 h-10 rounded-full hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        title="Change language"
      >
        <MdLanguage className="text-3xl" />
        {/* 언어 텍스트는 숨김 */}
      </button>
      {open && (
        <ul
          className="absolute left-1/2 -translate-x-1/2 z-10 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 animate-fade-in"
          role="listbox"
        >
          {LANGUAGES.map((lang) => (
            <li
              key={lang.code}
              className={`cursor-pointer px-4 py-2 flex items-center gap-2 transition 
                ${
                  value === lang.code
                    ? "bg-blue-100 font-semibold"
                    : "hover:bg-gray-100"
                }
              `}
              role="option"
              aria-selected={value === lang.code}
              tabIndex={0}
              onClick={() => {
                onChange(lang.code);
                setOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onChange(lang.code);
                  setOpen(false);
                }
              }}
            >
              <span className="text-base">{lang.label}</span>
              {value === lang.code && (
                <svg
                  className="w-4 h-4 text-blue-500 ml-auto"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
      {/* 애니메이션용 Tailwind 커스텀 */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.15s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}
