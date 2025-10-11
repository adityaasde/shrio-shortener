"use client";

import BtnLoader from "@/components/BtnLoader";
import Loader from "@/components/Loader";
import { fetchQr } from "@/service/fetchQr";
import { updateQr } from "@/service/updateQr";
import { userStore } from "@/store/userStore";
import { serverQR } from "@/types/product";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function QR() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showMsg, setMsg] = useState<string>("");
  const [qrData, setQrData] = useState<serverQR>();
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const user = userStore((state) => state.user);
  const [updateData, setUpdateData] = useState({
    redirectTo: "",
    description: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchQRUser = async () => {
    try {
      setPageLoading(true);

      const fetch = await fetchQr(id, user);

      if (!fetch.success) {
        setMsg(fetch.message);
        setPageLoading(false);
        return;
      }

      if (fetch.success) {
        setPageLoading(false);
        setQrData(fetch.toPass);
        return;
      }
    } catch (err: any) {
      setMsg(err.message);
      setPageLoading(false);
      return;
    }
  };

  useEffect(() => {
    setPageLoading(true);
    const startFetch = async () => {
      fetchQRUser();
      setPageLoading(false);
    };

    startFetch();
  }, []);

  useEffect(() => {
    if (!qrData) {
      return;
    }

    setUpdateData((prev) => ({
      ...prev,
      description: qrData?.description || "",
      redirectTo: qrData?.redirectTo || "",
    }));
  }, [qrData]);

  const updateUserQR = async (e: React.ChangeEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const reqUpdate = await updateQr(
        updateData.description,
        updateData.redirectTo,
        user,
        id
      );

      if (!reqUpdate.success) {
        setMsg(reqUpdate.message);
        setLoading(false);
        return;
      } else {
        setMsg(reqUpdate.message);
        setLoading(false);
        return;
      }
    } catch (err: any) {
      setMsg(err.message);
      setLoading(false);
      return;
    }
  };

  return (
    <div>
      {pageLoading ? (
        <Loader />
      ) : (
        <div className="max-w-[800px] min-w-[200px] border border-stone-800 rounded-lg mx-auto my-16 flex flex-col gap-4 py-4 px-2">
          <div id="head">
            <button className="flex p-1 cursor-pointer">
              <span
                className="material-symbols-outlined"
                onClick={() => (window.location.href = "/")}
              >
                arrow_back
              </span>
            </button>
          </div>
          <div id="qr-code" className="mx-auto">
            <img src={qrData?.imgUrl} alt="qr-image" className="w-48 h-48" />
          </div>
          <div id="inputs">
            <form onSubmit={updateUserQR} className="flex flex-col gap-2">
              <input
                type="url"
                name="redirectTo"
                id="redirectTo"
                value={updateData.redirectTo}
                onChange={handleInput}
                placeholder="Original URL"
                className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full"
                required
              />
              <input
                type="text"
                name="description"
                value={updateData.description}
                onChange={handleInput}
                id="description"
                placeholder="Description"
                className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full"
              />
              {showMsg.length > 0 && (
                <div className="text-stone-400 my-0.5">{showMsg}</div>
              )}
              {!loading ? (
                <button className="bg-white text-black w-full rounded-lg p-2 font-semibold cursor-pointer transition-all hover:opacity-80 duration-200">
                  Save Changes
                </button>
              ) : (
                <button
                  disabled
                  className="bg-white text-black w-full rounded-lg p-2 font-semibold cursor-not-allowed transition-all opacity-80 duration-200"
                >
                  <BtnLoader />
                </button>
              )}
            </form>
          </div>
          <div
            id="analytics"
            className="flex flex-row items-center gap-1 w-full max-sm:flex-col"
          >
            <div
              id="block"
              className="flex flex-col gap-2 w-full border border-stone-900 p-2 rounded-lg text-center w"
            >
              <p className="line-clamp-1">Estimated Scans</p>
              <p className="text-lg font-semibold">{qrData?.scans}</p>
            </div>
            <div
              id="block"
              className="flex flex-col gap-2 w-full border border-stone-900 p-2 rounded-lg text-center"
            >
              <p className="line-clamp-1">Today's Scans</p>
              <p className="text-lg font-semibold">{qrData?.dailyScans.count}</p>
            </div>
            <div
              id="block"
              className="flex flex-col gap-2 w-full border border-stone-900 p-2 rounded-lg text-center"
            >
              <p>Mobile</p>
              <p className="text-lg font-semibold">{qrData?.deviceStats.mobile}</p>
            </div>
            <div
              id="block"
              className="flex flex-col gap-2 w-full border border-stone-900 p-2 rounded-lg text-center"
            >
              <p>Desktop</p>
              <p className="text-lg font-semibold">{qrData?.deviceStats.desktop}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
