"use client";

import { useRef, useState } from "react";

export default function ResetPassword() {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const conPasswordRef = useRef<HTMLInputElement | null>(null);
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
          Reset Password
        </div>
        <div id="form" className="w-full">
          <form className="w-full flex flex-col gap-2">
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              className="w-full border border-stone-900 p-2 outline-none focus:ring-stone-800 focus:ring-1 rounded-md"
              id="password"
              name="password"
              placeholder="Password.."
              required
            />
            <div className="flex flex-row items-center gap-2">
              <input
                ref={conPasswordRef}
                type={showPassword ? "text" : "password"}
                id="con-password"
                className="w-full border border-stone-900 p-2 outline-none focus:ring-stone-800 focus:ring-1 rounded-md"
                placeholder="Confirm password.."
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
            <div className="text-red-600">Invalid Password!</div>
            <button
              type="submit"
              className="w-full p-2 bg-white text-black font-semibold outline-none cursor-pointer hover:opacity-80 rounded-md transition-all duration-200"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
