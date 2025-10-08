"use client";

import Link from "next/link";

export default function ForgotPassword() {
 
  return (
    <div className="mt-24">
      <div
        id="form-wrapper"
        className="max-w-[450px] min-w-[250px] mx-auto flex flex-col items-center justify-center p-2 gap-4"
      >
        <div id="head" className="text-2xl font-semibold">
          Forgot Password
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
