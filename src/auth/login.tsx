import { useState } from "react";
import { CustomHeader } from "../shared/components/CustomHeader";
import { Link } from "react-router/internal/react-server-client";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log({ username });
    setIsLoggedIn(true);

    localStorage.setItem('username', username);
  };

  if(isLoggedIn) {
    return (
      <section className="bg-app">
        <CustomHeader title="Login" link={{ to: "/", text: "Home" }} />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl font-bold">Welcome, {localStorage.getItem('username')}!</h2>
          <p> Go to the <Link to="/" className="text-blue-500 hover:underline">Home</Link> page.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-app">
      <CustomHeader title="Login" link={{ to: "/", text: "Home" }} />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md -mt-16">
          <form className="flex flex-col gap-4 w-full max-w-sm">
            <label htmlFor="username" className="text-lg font-semibold">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="border border-gray-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
