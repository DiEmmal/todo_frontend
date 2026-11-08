import { Link } from "react-router";

interface Props {
  title: string;
  link?: {
    to: string;
    text: string;
  };
}

export function CustomHeader({ title, link }: Props) {

  return (
    <header className="relative bg-blue-800 p-4 text-center font-semibold text-white">
      <h1 className="text-3xl font-bold">{title}</h1>
      <Link
        to={link ? link.to : "/auth/login"}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg border border-sky-200/60 bg-sky-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
      >
        {link ? link.text : "Login"}
      </Link>
    </header>
  )
}