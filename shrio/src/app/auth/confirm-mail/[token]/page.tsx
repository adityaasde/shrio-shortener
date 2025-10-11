"use client";

import { confirmMail } from "@/service/confirmMail";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { userStore } from "@/store/userStore";

export default function ConfirmMail() {
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const params = useParams<{ token: string }>();
  const token = params.token;
  const setUser = userStore((state) => state.setUser);

  const [showMsg, setMsg] = useState<string>("");

  const authMailUser = async () => {
    if (!token) {
      router.push("/auth/login");
      return;
    }
    setMsg("Authorizing email");

    try {
      const req = await confirmMail(token);
      if (!req.success) {
        setMsg(req.message + " Redirecting to login page..");
        setTimeout(() => {
          router.push("/auth/login");
        }, 1500);
        return;
      }

      setMsg(req.message);
      setLoading(false);
      setUser(req.toPass);
      router.push("/");
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

  useEffect(() => {
    const runFun = async () => {
      await authMailUser();
    };

    runFun();
  }, []);

  return (
    <div className="mt-24 flex flex-col gap-2 text-center items-center justify-center">
      {loading && (
        <div
          id="loader"
          className="w-10 h-10 rounded-full border-4 border-t-stone-800 animate-spin"
        />
      )}
      <div>{showMsg}</div>
    </div>
  );
}
