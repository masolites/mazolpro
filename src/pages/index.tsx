import { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import SignInForm from "../components/Auth/SignInForm";
import SignUpForm from "../components/Auth/SignUpForm";

export default function Home() {
  const [showSignIn, setShowSignIn] = useState(true);

  function handleAuthSuccess() {
    window.location.href = "/dashboard";
  }

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-xl w-full p-8 bg-white rounded-lg shadow-md mt-10">
          <h1 className="text-3xl font-bold text-center mb-2">
            MAZOL-Pro
          </h1>
          <h2 className="text-lg text-center text-gray-600 mb-6">
            Blockchain supported Platform promoting a Better
            Society Together by offering Trusted Systems,
            Goods & Services to people
          </h2>
          <div className="flex justify-center mb-4">
            <button
              className={`px-4 py-2 rounded-l ${showSignIn ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setShowSignIn(true)}
            >
              Sign In
            </button>
            <button
              className={`px-4 py-2 rounded-r ${!showSignIn ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setShowSignIn(false)}
            >
              Sign Up
            </button>
          </div>
          {showSignIn ? (
            <SignInForm onSuccess={handleAuthSuccess} />
          ) : (
            <SignUpForm onSuccess={handleAuthSuccess} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
