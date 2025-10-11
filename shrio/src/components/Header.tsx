"use client";

import { fetchUser } from "@/service/fetchUser";
import { logout } from "@/service/logout";
import { userStore } from "@/store/userStore";
import Link from "next/link";
import { useEffect } from "react";

export function Header() {
  const loginUser = userStore((state) => state.user);

  useEffect(() => {
    const fetch = async () => {
      const { loggedIn, user } = await fetchUser();
      if (loggedIn) {
        userStore.getState().setUser(user);
      } else {
        userStore.getState().logout();
      }
    };

    fetch();
  }, []);

  return (
    <div>
      <div
        id="header"
        className="flex flex-row justify-between items-center py-2"
      >
        <Link href="/" id="logo" className="text-2xl">
          Shrio
        </Link>
        <div id="link" className="flex flex-row items-center gap-2">
          {loginUser ? (
            <button
              className="cursor-pointer flex p-2 rounded-lg border border-stone-800"
              onClick={() => logout()}
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
          ) : (
            <Link
              href="/auth/signup"
              className="px-4 py-2 text-black bg-white font-semibold cursor-pointer hover:opacity-80 transition-all rounded-lg"
            >
              Signup
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
