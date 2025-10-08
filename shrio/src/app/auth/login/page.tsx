"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export default function Login() {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setPassword] = useState<boolean>(false);
  const togglePassword = () => {
    setPassword((prev) => !prev);
  };
  return (
    <div className="mt-24">
      <div
        id="form-wrapper"
        className="max-w-[450px] min-w-[250px] mx-auto flex flex-col items-center justify-center p-2 gap-4"
      >
        <div id="head" className="text-2xl font-semibold">
          Login to Shrio
        </div>
        <div id="form" className="w-full">
          <form className="w-full flex flex-col gap-2">
            <input
              type="email"
              className="w-full border border-stone-900 p-2 outline-none focus:ring-stone-800 focus:ring-1 rounded-md"
              id="email"
              name="email"
              placeholder="Email address.."
              required
            />
            <div className="flex flex-row items-center gap-2">
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full border border-stone-900 p-2 outline-none focus:ring-stone-800 focus:ring-1 rounded-md"
                placeholder="Password.."
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="flex p-2 border-stone-900 rounded-lg cursor-pointer border outline-none"
              >
                <span className="material-symbols-outlined">
                  visibility_off
                </span>
              </button>
            </div>
            <Link href="/auth/forgot-password" className="hover:underline">
              Forgot Password ?
            </Link>
            <div className="text-red-600">Invalid Password!</div>
            <button
              type="submit"
              className="w-full p-2 bg-white text-black font-semibold outline-none cursor-pointer hover:opacity-80 rounded-md transition-all duration-200"
            >
              Continue
            </button>
          </form>
          <div
            id="signin"
            className="flex flex-row items-center justify-center p-2 gap-1"
          >
            Don't have an account ?
            <Link href="/auth/signup" className="text-sky-500 hover:underline">
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
