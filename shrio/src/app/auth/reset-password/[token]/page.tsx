"use client";

import BtnLoader from "@/components/BtnLoader";
import { resetPassword } from "@/service/resetPassword";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function ResetPassword() {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const conPasswordRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setPassword] = useState<boolean>(false);
  const [showMsg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams<{ token: string }>();
  const token = params.token || "";
  const [resetData, setResetData] = useState({
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setResetData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }
  }, []);

  const togglePassword = () => {
    setPassword((prev) => !prev);
  };

  const resetPasswordUser = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);

      if (confirmPassword != resetData.password) {
        setMsg("Both password not matching!");
        setLoading(false);
        return;
      }

      if (!token) {
        return;
      }

      const req = await resetPassword(resetData.password, token);
      if (!req.success) {
        setMsg(req.message);
        setLoading(false);
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
          Reset Password
        </div>
        <div id="form" className="w-full">
          <form
            className="w-full flex flex-col gap-2"
            onSubmit={resetPasswordUser}
          >
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              value={resetData.password}
              onChange={handleInput}
              className="w-full border border-stone-900 p-2 outline-none focus:ring-stone-800 focus:ring-1 rounded-md"
              id="password"
              name="password"
              placeholder="Password (Must be 8 characters)"
              required
            />
            <div className="flex flex-row items-center gap-2">
              <input
                ref={conPasswordRef}
                type={showPassword ? "text" : "password"}
                name="password"
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
                id="con-password"
                className="w-full border border-stone-900 p-2 outline-none focus:ring-stone-800 focus:ring-1 rounded-md"
                placeholder="Confirm password"
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
                Change Password
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
        </div>
      </div>
    </div>
  );
}
