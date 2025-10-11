"use client";

import React, { useEffect, useState } from "react";
import {
  createUserQR,
  createUserUrl,
  serverQR,
  serverURL,
} from "@/types/product";
import { storeUrl } from "@/service/storeUrl";
import { userStore } from "@/store/userStore";
import BtnLoader from "@/components/BtnLoader";
import { fetchUrls } from "@/service/fetchUrls";
import QRCode from "qrcode";
import { storeQr } from "@/service/storeQr";
import { fetchQrs } from "@/service/fetchQrs";
import { deleteQr } from "@/service/deleteQr";
import { generateSlug } from "@/utils/generateSlug";

export default function Home() {
  const [activeBtn, setActiveBtn] = useState<string>("url");
  const [loading, setLoading] = useState<boolean>(false);
  const [qrLoading, setQrLoading] = useState<boolean>(false);
  const [savedQrs, setSavedQrs] = useState<serverQR[]>([]);
  const [showQrMsg, setQrMsg] = useState<string>("");
  const [savedUrls, setSavedUrls] = useState<serverURL[]>([]);
  const [showMsg, setMsg] = useState<string>("");
  const defaultExpire = new Date();
  defaultExpire.setDate(defaultExpire.getDate() + 2);
  const user = userStore((state) => state.user);
  const [urlData, setUrlData] = useState<createUserUrl>({
    redirectTo: "",
    slug: "",
    description: "",
    expireDate: defaultExpire,
  });
  const [qrData, setQrData] = useState<createUserQR>({
    redirectTo: "",
    description: "",
    imgUrl: "",
  });

  const inputHandlerQR = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setQrData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const btnToggler = (btnName: string) => {
    if (btnName == "url") {
      setActiveBtn(btnName);
      return;
    }
    if (btnName == "qr") {
      setActiveBtn(btnName);
      return;
    }
  };

  useEffect(() => {
    const req = async () => {
      const urls = await fetchUrls(user);
      const qrs = await fetchQrs(user);

      if (!urls.success) {
        return;
      } else if (!qrs.success) {
        return;
      }

      setSavedQrs(qrs.toPass);
      setSavedUrls(urls.toPass);
    };

    req();
  }, [user]);

  const generateQrCode = async (url: string) => {
    try {
      const imgUrl = await QRCode.toDataURL(url);
      return imgUrl;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setQrMsg(err.message);
      } else {
        setQrMsg("An unknown error occurred");
      }
      return;
    }
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUrlData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createUrl = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);

      if (!urlData.expireDate) {
        return;
      }

      const userUrl = await storeUrl(
        urlData.redirectTo,
        urlData.slug,
        urlData.description,
        urlData.expireDate,
        user
      );

      if (!userUrl.success) {
        setMsg(userUrl.message);
        setLoading(false);
        return;
      }

      setMsg(userUrl.message);
      setLoading(false);
      setSavedUrls((prev) => [...prev, userUrl.toPass]);
      setUrlData((prev) => ({
        ...prev,
        description: "",
        redirectTo: "",
        slug: "",
        expireDate: defaultExpire,
      }));
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

  const createQR = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setQrLoading(true);

      const randomSlug = generateSlug(6);
      const imgUrl = await generateQrCode(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/scan/${randomSlug}`
      );

      if (!imgUrl) {
        setQrMsg("Failed to generate QR Code");
        setQrLoading(false);
        return;
      }

      const req = await storeQr(
        qrData.redirectTo,
        qrData.description,
        imgUrl,
        user,
        randomSlug
      );

      if (!req.success) {
        setQrMsg(req.message);
        setQrLoading(false);
        return;
      } else {
        setQrMsg(req.message);
        setQrLoading(false);
        setSavedQrs((prev) => [...prev, req.toPass]);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setQrMsg(err.message);
      } else {
        setQrMsg("An unknown error occurred");
      }
      setQrLoading(false);
      return;
    }
  };

  const copyUrl = (text: string) => {
    if (!text) return;
    window.navigator.clipboard.writeText(text);
  };

  const deleteUserQr = async (id: string) => {
    if (!id) return;
    try {
      const ask = confirm("are u sure ?");

      if (!ask) {
        return;
      }
      const reqDelete = await deleteQr(id, user);
      if (!reqDelete.success) {
        setQrMsg(reqDelete.message);
        return;
      } else {
        setQrMsg(reqDelete.message);
        return;
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setQrMsg(err.message);
      } else {
        setQrMsg("An unknown error occurred");
      }
      return;
    }
  };

  const downloadQr = (data: string) => {
    const cleaned = data.replace(/^data:image\/\w+;base64,/, "");

    const byteChars = atob(cleaned);
    const byteNums = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
      byteNums[i] = byteChars.charCodeAt(i);
    }
    const byteArr = new Uint8Array(byteNums);

    const blob = new Blob([byteArr], { type: "image/png" });
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    document.body.appendChild(link);
    link.download = "QR.png";
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(blobUrl);
  };

  const convertBase64 = (data: string) => {
    const cleaned = data.replace(/^data:image\/\w+;base64,/, "");

    const byteChars = atob(cleaned);
    const byteNums = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
      byteNums[i] = byteChars.charCodeAt(i);
    }
    const byteArr = new Uint8Array(byteNums);

    const blob = new Blob([byteArr], { type: "image/png" });
    const blobUrl = URL.createObjectURL(blob);

    window.open(blobUrl, "_blank");
  };

  return (
    <div>
      <div className="max-w-[800px] min-w-[200px] border border-stone-800 rounded-lg mx-auto my-12 flex flex-col gap-4 py-4 px-2">
        <div
          id="btns"
          className="flex flex-row items-center gap-2 w-fit justify-center mx-auto"
        >
          <button
            onClick={() => btnToggler("url")}
            className={`${
              activeBtn == "url" ? "bg-white text-black" : "text-white"
            } px-4 py-2 rounded-lg font-semibold cursor-pointer hover:opacity-80 transition-all duration-200 flex flex-row items-center gap-2 border border-stone-800`}
          >
            <span className="material-symbols-outlined">link</span>
            URL
          </button>
          <button
            onClick={() => btnToggler("qr")}
            className={`${
              activeBtn == "qr" ? "bg-white text-black" : "text-white"
            } px-4 py-2 rounded-lg font-semibold cursor-pointer hover:opacity-80 transition-all duration-200 flex flex-row items-center gap-2 border border-stone-800`}
          >
            <span className="material-symbols-outlined">qr_code</span>
            QR
          </button>
        </div>
        {activeBtn == "url" ? (
          <div id="url-box" className="p-2 flex flex-col gap-2">
            <form className="flex flex-col gap-2" onSubmit={createUrl}>
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="redirectTo">Your magic link goes here*</label>
                <input
                  type="url"
                  name="redirectTo"
                  value={urlData.redirectTo}
                  onChange={inputHandler}
                  id="redirectTo"
                  placeholder="https://example.com/fun-page"
                  className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full"
                  required
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="slug">Give your link a nickname</label>
                <input
                  type="text"
                  name="slug"
                  value={urlData.slug}
                  onChange={inputHandler}
                  id="slug"
                  placeholder="Your URL's nickname (e.g. my-cool-page)"
                  className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  value={urlData.description}
                  onChange={inputHandler}
                  id="description"
                  placeholder="What's this link about? Keep it short & sweet"
                  className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="expire">Link Expiration Date</label>
                <input
                  type="date"
                  id="expireDate"
                  name="expireDate"
                  value={
                    urlData.expireDate
                      ? urlData.expireDate.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => {
                    const selectedDate = e.target.value
                      ? new Date(e.target.value)
                      : defaultExpire;
                    setUrlData((prev) => ({
                      ...prev,
                      expireDate: selectedDate,
                    }));
                  }}
                  min={new Date().toISOString().split("T")[0]}
                  className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full"
                />
              </div>
              {showMsg.length > 0 && (
                <div className="text-stone-400 my-0.5">{showMsg}</div>
              )}
              {!loading ? (
                <button
                  type="submit"
                  className="bg-white text-black p-2 font-semibold rounded-lg cursor-pointer transition-all duration-200 hover:opacity-80"
                >
                  Generate URL
                </button>
              ) : (
                <button
                  disabled
                  className="bg-white text-black p-2 font-semibold rounded-lg cursor-not-allowed transition-all duration-200 opacity-80"
                >
                  <BtnLoader />
                </button>
              )}
            </form>
            {savedUrls && savedUrls.length > 0 && (
              <div
                id="generated"
                className="flex flex-col gap-2 h-48 overflow-y-auto"
              >
                <h2>Shorten Links</h2>
                {savedUrls.map((url) => (
                  <div
                    className="flex flex-row gap-2 items-center"
                    key={url._id}
                  >
                    <input
                      type="text"
                      readOnly
                      id="shortUrl"
                      name="shortUrl"
                      onClick={() =>
                        (window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/${url.slug}`)
                      }
                      value={`${process.env.NEXT_PUBLIC_SERVER_URL}/${url.slug}`}
                      className="w-full cursor-pointer p-2 border hover:underline outline-none text-stone-400 border-stone-800 rounded-lg"
                    />
                    <button
                      onClick={() =>
                        copyUrl(
                          `${process.env.NEXT_PUBLIC_SERVER_URL}/${url.slug}`
                        )
                      }
                      className="flex p-2 border border-stone-800 rounded-lg cursor-pointer hover:bg-stone-900"
                    >
                      <span className="material-symbols-outlined">
                        content_copy
                      </span>
                    </button>
                    <button
                      onClick={() => (window.location.href = `/url/${url._id}`)}
                      className="flex p-2 border border-stone-800 rounded-lg cursor-pointer hover:bg-stone-900"
                    >
                      <span className="material-symbols-outlined">
                        edit_square
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div id="qr-box" className="p-2 flex flex-col gap-2">
            <form className="flex flex-col gap-2" onSubmit={createQR}>
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="redirectTo">Your magic link goes here*</label>
                <input
                  type="url"
                  name="redirectTo"
                  value={qrData.redirectTo}
                  onChange={inputHandlerQR}
                  id="redirectTo"
                  placeholder="https://example.com/fun-page"
                  className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full"
                  required
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="desc">Description</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={qrData.description}
                  onChange={inputHandlerQR}
                  placeholder="What's this link about? Keep it short & sweet"
                  className="p-2 border border-stone-800 outline-none focus:ring-stone-900 focus:ring-1 rounded-lg w-full"
                />
              </div>
              {showQrMsg.length > 0 && (
                <div className="text-stone-400">{showQrMsg}</div>
              )}
              {!qrLoading ? (
                <button className="bg-white text-black p-2 font-semibold rounded-lg cursor-pointer transition-all duration-200 hover:opacity-80">
                  Generate QR Code
                </button>
              ) : (
                <button className="bg-white text-black p-2 font-semibold rounded-lg cursor-not-allowed transition-all duration-200 opacity-80">
                  <BtnLoader />
                </button>
              )}
            </form>
            {savedQrs.length > 0 && (
              <div id="generated" className="flex flex-col gap-2">
                <h2>QR Codes</h2>
                {savedQrs.map((qr) => (
                  <div className="flex flex-row gap-2" key={qr._id}>
                    <input
                      type="text"
                      readOnly
                      id="qrUrl"
                      name="qrUrl"
                      defaultValue={qr.redirectTo}
                      disabled
                      className="w-full cursor-pointer p-2 border border-stone-800 rounded-lg text-stone-400"
                    />
                    <button
                      onClick={() => (window.location.href = `/qr/${qr._id}`)}
                      className="flex items-center justify-center p-2 border border-stone-800 hover:bg-stone-900 text-white cursor-pointer rounded-lg hover:opacity-80 transition"
                    >
                      <span className="material-symbols-outlined text-sm">
                        edit_square
                      </span>
                    </button>
                    <button
                      onClick={() => convertBase64(qr.imgUrl)}
                      className="flex items-center justify-center p-2 border border-stone-800 hover:bg-stone-900 text-white cursor-pointer rounded-lg hover:opacity-80 transition"
                    >
                      <span className="material-symbols-outlined text-sm">
                        open_in_new
                      </span>
                    </button>
                    <button
                      onClick={() => downloadQr(qr.imgUrl)}
                      className="flex p-2 border border-stone-800 rounded-lg cursor-pointer hover:bg-stone-900"
                    >
                      <span className="material-symbols-outlined">
                        download
                      </span>
                    </button>
                    <button
                      onClick={() => deleteUserQr(qr._id)}
                      className="flex items-center justify-center p-2 bg-red-500 text-white cursor-pointer rounded-lg hover:opacity-80 transition"
                    >
                      <span className="material-symbols-outlined text-sm">
                        delete
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
