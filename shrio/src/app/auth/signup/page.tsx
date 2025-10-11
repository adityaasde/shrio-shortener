"use client";

import BtnLoader from "@/components/BtnLoader";
import { signupUser } from "@/service/signup";
import { authUser } from "@/types/auth";
import Link from "next/link";
import React, { useRef, useState } from "react";

export default function SignUp() {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setPassword] = useState<boolean>(false);
  const [showMsg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [signUpData, setSignUpData] = useState<authUser>({
    email: "",
    password: "",
  });

  const togglePassword = () => {
    setPassword((prev) => !prev);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const userSignup = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const req = await signupUser(signUpData.email, signUpData.password);
      if (!req.success) {
        setLoading(false);
        setMsg(req.message);
        return;
      }

      setMsg(req.message);
      setLoading(false);
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
          SignUp to Shrio
        </div>
        <div id="form" className="w-full">
          <form className="w-full flex flex-col gap-2" onSubmit={userSignup}>
            <input
              type="email"
              className="w-full border border-stone-900 p-2 outline-none focus:ring-stone-800 focus:ring-1 rounded-md"
              id="email"
              name="email"
              value={signUpData.email}
              onChange={handleInput}
              placeholder="Email address"
              required
            />
            <div className="flex flex-row items-center gap-2">
              <input
                ref={passwordRef}
                name="password"
                value={signUpData.password}
                onChange={handleInput}
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full border border-stone-900 p-2 outline-none focus:ring-stone-800 focus:ring-1 rounded-md"
                placeholder="Password (Must be 8 characters)"
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
            Have an account ?
            <Link href="/auth/login" className="text-sky-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
