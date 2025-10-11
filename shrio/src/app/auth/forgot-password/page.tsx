"use client";

import BtnLoader from "@/components/BtnLoader";
import { forgotPassword } from "@/service/forgotPassword";
import Link from "next/link";
import React, { useState } from "react";

export default function ForgotPassword() {
  const [showMsg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState({
    email: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setEmail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const forgotUser = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const req = await forgotPassword(email.email);
      if (!req.success) {
        setLoading(false);
        setMsg(req.message);
        return;
      }

      setLoading(false);
      setMsg(req.message);
      return;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMsg(err.message);
      } else {
        setMsg("An unknown error occurred");
      }
      setLoading(false);
      return;
    }
  };

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
          <form className="w-full flex flex-col gap-2" onSubmit={forgotUser}>
            <input
              type="email"
              className="w-full border border-stone-900 p-2 outline-none focus:ring-stone-800 focus:ring-1 rounded-md"
              id="email"
              value={email.email}
              onChange={handleInput}
              name="email"
              placeholder="Email address.."
              required
            />
            {showMsg.length > 0 && (
              <div className="text-stone-400 my-0.5">{showMsg}</div>
            )}
            {!loading ? (
              <button
                type="submit"
                className="w-full p-2 bg-white text-black font-semibold outline-none cursor-pointer hover:opacity-80 rounded-md transition-all duration-200"
              >
                Continue
              </button>
            ) : (
              <button
                disabled
                className="w-full p-2 bg-white text-black font-semibold outline-none cursor-not-allowed opacity-80 rounded-md transition-all duration-200"
              >
                <BtnLoader />
              </button>
            )}
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
