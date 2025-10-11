"use client";

import BtnLoader from "@/components/BtnLoader";
import { loginUser } from "@/service/login";
import { userStore } from "@/store/userStore";
import { authUser } from "@/types/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

export default function Login() {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [showPassword, setPassword] = useState<boolean>(false);
  const [showMsg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  let user = userStore((state) => state.setUser);
  const [loginData, setLoginData] = useState<authUser>({
    email: "",
    password: "",
  });

  const togglePassword = () => {
    setPassword((prev) => !prev);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const userLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const req = await loginUser(loginData.email, loginData.password);
      if (!req.success) {
        setLoading(false);
        setMsg(req.message);
        return;
      }

      setMsg(req.message);
      setLoading(false);
      user(req.toPass);
      router.push("/");
      return;
    } catch (err: any) {
      setMsg(err.message);
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
          Login to Shrio
        </div>
        <div id="form" className="w-full">
          <form className="w-full flex flex-col gap-2" onSubmit={userLogin}>
            <input
              type="email"
              className="w-full border border-stone-900 p-2 outline-none focus:ring-stone-800 focus:ring-1 rounded-md"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleInput}
              placeholder="Email address"
              required
            />
            <div className="flex flex-row items-center gap-2">
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={loginData.password}
                onChange={handleInput}
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
            <Link href="/auth/forgot-password" className="hover:underline">
              Forgot Password ?
            </Link>
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
                className="w-full cursor-not-allowed p-2 bg-white text-black font-semibold outline-none opacity-80 rounded-md transition-all duration-200"
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
